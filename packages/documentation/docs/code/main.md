---
title: main
---

# main

<a name="Cluster"></a>

## Cluster
HACK: Cluster should be loaded conditionally
However in the web version, it's not possible to write
`import 'vue2-google-maps/src/components/cluster'`, so we need to
import it anyway (but we don't have to register it)
Therefore we use babel-plugin-transform-inline-environment-variables to
set BUILD_DEV to truthy / falsy

**Kind**: global constant  
