create or replace
procedure json2 (inParam in VARCHAR2,outParam out CLOB)
is
param VARCHAR2(4000);
BEGIN

with hard as
(
  select DISTINCT '{'
    ||'"n":"'||d1.device||'"'
    ||',"c":"'||d1.devicecount||'"'
    ||'}' json
    , d1.*
  FROM (select DISTINCT * from device) d1
)
, location as
(
  select DISTINCT '{'
    ||'"n":"'||d2.location||'"'
    ||',"c":"'||''||'"'
    ||',"h":'||(select '['||listagg(json,',') within group (order by 1)||']' as data
                                from hard h where h.location=d2.location)
    ||'}' json
    , d2.*
  FROM (select location, max(area) as area from device group by location) d2
)

,area as
(
  select '{'
    ||'"n":"'||d3.area||'"'
    ||',"c":"'||''||'"'
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
  FROM (select region from device where region=inParam group by region) d4
)


select (''
      ||(select listagg(json,',') within group (order by 1) as data
                                from region)
      || '') as json
      into param
from dual;
outParam := to_clob(param);
end;
