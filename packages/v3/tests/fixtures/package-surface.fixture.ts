import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface ExportCondition {
  types?: string;
  default?: string;
}

interface ExportTarget {
  import?: ExportCondition | string;
  require?: ExportCondition | string;
}

interface PackageManifest {
  exports: Record<string, ExportTarget>;
}

interface MissingEntry {
  exportPath: string;
  condition: string;
  filePath: string;
}

const packageManifestPath = resolve(__dirname, '..', '..', 'package.json');

export function readPackageManifest(): PackageManifest {
  const packageManifestContent = readFileSync(packageManifestPath, 'utf8');
  const parsedManifest: unknown = JSON.parse(packageManifestContent);
  if (!isPackageManifest(parsedManifest)) {
    throw new Error(
      'package.json exports manifest is invalid for package-surface tests',
    );
  }

  return parsedManifest;
}

function isPackageManifest(value: unknown): value is PackageManifest {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const exportsValue = (value as { exports?: unknown }).exports;
  return Boolean(exportsValue && typeof exportsValue === 'object');
}

function normalizeExportPaths(
  target: ExportTarget,
): { condition: string; filePath: string }[] {
  const resolvedPaths: { condition: string; filePath: string }[] = [];
  const conditions: {
    key: 'import' | 'require';
    value: ExportCondition | string | undefined;
  }[] = [
    { key: 'import', value: target.import },
    { key: 'require', value: target.require },
  ];

  for (const condition of conditions) {
    if (!condition.value) {
      continue;
    }

    if (typeof condition.value === 'string') {
      resolvedPaths.push({
        condition: condition.key,
        filePath: condition.value,
      });
      continue;
    }

    if (condition.value.default) {
      resolvedPaths.push({
        condition: `${condition.key}.default`,
        filePath: condition.value.default,
      });
    }

    if (condition.value.types) {
      resolvedPaths.push({
        condition: `${condition.key}.types`,
        filePath: condition.value.types,
      });
    }
  }

  return resolvedPaths;
}

export function assertExportPathsExist(manifest: PackageManifest): {
  missingEntries: MissingEntry[];
} {
  const missingEntries: MissingEntry[] = [];

  for (const [exportPath, target] of Object.entries(manifest.exports)) {
    const normalizedPaths = normalizeExportPaths(target);

    for (const normalizedPath of normalizedPaths) {
      const resolvedPath = resolve(
        packageManifestPath,
        '..',
        normalizedPath.filePath,
      );
      try {
        readFileSync(resolvedPath, 'utf8');
      } catch {
        missingEntries.push({
          exportPath,
          condition: normalizedPath.condition,
          filePath: normalizedPath.filePath,
        });
      }
    }
  }

  return { missingEntries };
}

export const SUPPORTED_PUBLIC_SUBPATHS = [
  '.',
  './components',
  './composables',
  './keys',
  './interfaces',
  './types',
] as const;

export const UNSUPPORTED_DEEP_IMPORTS = [
  './src/main',
  './src/composables/helpers',
  './components/map-layer.vue',
] as const;
