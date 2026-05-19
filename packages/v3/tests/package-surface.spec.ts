import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import {
  assertExportPathsExist,
  readPackageManifest,
  SUPPORTED_PUBLIC_SUBPATHS,
  UNSUPPORTED_DEEP_IMPORTS,
} from './fixtures/package-surface.fixture';

const packageRoot = resolve(__dirname, '..');

function runNodeSmokeCheck(command: string) {
  return spawnSync('node', ['-e', command], {
    cwd: packageRoot,
    encoding: 'utf8',
  });
}

function runNodeEsmSmokeCheck(command: string) {
  return spawnSync('node', ['--input-type=module', '-e', command], {
    cwd: packageRoot,
    encoding: 'utf8',
  });
}

describe('v3 package surface contract', () => {
  it('resolves documented package entrypoints in exports', () => {
    const manifest = readPackageManifest();

    for (const publicSubpath of SUPPORTED_PUBLIC_SUBPATHS) {
      expect(manifest.exports[publicSubpath]).toBeDefined();
    }

    expect(manifest.exports['.']).toMatchObject({
      import: {
        default: './dist/main.es.js',
        types: './dist/types/src/main.d.ts',
      },
      require: {
        default: './dist/main.cjs',
        types: './dist/types/src/main.d.ts',
      },
    });

    expect(manifest.exports).toMatchObject({
      './components': {
        import: {
          default: './dist/components.es.js',
          types: './dist/types/src/components/index.d.ts',
        },
        require: {
          default: './dist/components.cjs',
          types: './dist/types/src/components/index.d.ts',
        },
      },
      './composables': {
        import: {
          default: './dist/composables.es.js',
          types: './dist/types/src/composables/index.d.ts',
        },
        require: {
          default: './dist/composables.cjs',
          types: './dist/types/src/composables/index.d.ts',
        },
      },
      './keys': {
        import: {
          default: './dist/keys.es.js',
          types: './dist/types/src/keys/index.d.ts',
        },
        require: {
          default: './dist/keys.cjs',
          types: './dist/types/src/keys/index.d.ts',
        },
      },
      './interfaces': {
        import: {
          types: './dist/types/src/interfaces/index.d.ts',
        },
        require: {
          types: './dist/types/src/interfaces/index.d.ts',
        },
      },
      './types': {
        import: {
          types: './dist/types/src/types/index.d.ts',
        },
        require: {
          types: './dist/types/src/types/index.d.ts',
        },
      },
    });
  });

  it('executes CJS and ESM runtime imports for documented runtime entrypoints', () => {
    const cjsCommands = [
      "require('@gmap-vue/v3')",
      "require('@gmap-vue/v3/components')",
      "require('@gmap-vue/v3/composables')",
      "require('@gmap-vue/v3/keys')",
    ];

    for (const cjsCommand of cjsCommands) {
      const execution = runNodeSmokeCheck(cjsCommand);
      expect(execution.status, execution.stderr || execution.stdout).toBe(0);
    }

    const esmExecution = runNodeEsmSmokeCheck(
      "await import('@gmap-vue/v3'); await import('@gmap-vue/v3/components'); await import('@gmap-vue/v3/composables'); await import('@gmap-vue/v3/keys');",
    );
    expect(
      esmExecution.status,
      esmExecution.stderr || esmExecution.stdout,
    ).toBe(0);
  });

  it('maps exported runtime/type files to emitted dist artifacts', () => {
    const manifest = readPackageManifest();
    expect(assertExportPathsExist(manifest).missingEntries).toEqual([]);
  });

  it('rejects undocumented deep import paths from exports contract', () => {
    const manifest = readPackageManifest();

    for (const deepImportPath of UNSUPPORTED_DEEP_IMPORTS) {
      expect(manifest.exports[deepImportPath]).toBeUndefined();
    }
  });
});
