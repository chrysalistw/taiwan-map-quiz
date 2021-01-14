## data precessing using mapshaper.org
1. console > `-clean`
2. export
## export to svg
1. `cat COUNTY.json | tr -d '\n' > COUNTYoneline.json`
2. `ndjson-split 'd.features' < COUNTYoneline.json > county.ndjson`
3. `ndjson-map 'd.id = d.properties.COUNTYNAME, d' < county.ndjson > county-name.ndjson`
4. `geoproject -n 'd3.geoMercator()' county.ndjson > mercatorCounty.json`
5. `geo2svg -n < mercatorCounty.json > county.svg`
this solution is without styling.

## apply rotation and scaling
1. `d3.geoMercator().rotate([-121,24]).scale(2000)`

## viva mapshaper.org !
1. simplify to 25%
2. `$ -o format=svg id-field=COUNTYNAME`
  see `$ -help o`
