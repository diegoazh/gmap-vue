---
title: main
---

# main

## Constants

<dl>
<dt><a href="#Cluster">Cluster</a></dt>
<dd><p>HACK: Cluster should be loaded conditionally
However in the web version, it&#39;s not possible to write
<code>import &#39;gmap-vue/src/components/cluster&#39;</code>, so we need to
import it anyway (but we don&#39;t have to register it)
Therefore we use babel-plugin-transform-inline-environment-variables to
set BUILD_DEV to truthy / falsy</p>
</dd>
<dt><a href="#components">components</a></dt>
<dd><p>Export all components and mixins</p>
</dd>
<dt><a href="#helpers">helpers</a></dt>
<dd><p>Export all helpers</p>
</dd>
</dl>

<a name="Cluster"></a>

## Cluster
HACK: Cluster should be loaded conditionally
However in the web version, it's not possible to write
`import 'gmap-vue/src/components/cluster'`, so we need to
import it anyway (but we don't have to register it)
Therefore we use babel-plugin-transform-inline-environment-variables to
set BUILD_DEV to truthy / falsy

**Kind**: global constant  
<a name="components"></a>

## components
Export all components and mixins

**Kind**: global constant  
<a name="helpers"></a>

## helpers
Export all helpers

**Kind**: global constant  
