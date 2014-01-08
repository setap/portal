create or replace
procedure json4 (outParam out CLOB)
is
param CLOB;
BEGIN

with location as
(
  select DISTINCT '{'
    ||'"n":"'||d2.location||'"'
    ||'}' json
    , d2.*
  FROM (select location, max(area) as area from device group by location) d2
)

,area as
(
  select '{'
    ||'"n":"'||d3.area||'"'
    ||',"l":'||(select '['||listagg(json,',') within group (order by 1)||']' as data
                                from location l where l.area=d3.area)
    ||'}' json
    , d3.*
  FROM (select area, max(region) as region from device group by area) d3
)

,region as
(
  select '{'
    ||'"name":"'||d4.region||'"'
    ||',"area":'||(select '['||listagg(json,',') within group (order by 1)||']' as data
                                from area a where a.region=d4.region)
    ||'}' json
    , d4.*
  FROM (select region from device group by region) d4
)


select ('{"device" : ['
      ||(select listagg(json,',') within group (order by 1) as data
                                from region)
      || ']}') as json
      into param
from dual;
outParam := param;
end;
