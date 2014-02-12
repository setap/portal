create or replace procedure json_devices_v2 (outParam out CLOB)
is
param clob;
BEGIN
with hard as
(
  select DISTINCT '{'
    ||'"n":"'||d1.l1_hardware||'"'
    ||',"c":"''"'
    ||'}' json
    , d1.*
  FROM (select DISTINCT * from portal_device_tree) d1
)
, location as
(
  select DISTINCT '{'
    ||'"n":"'||TRANSLITE(d2.s1_location)||'"'
    ||',"c":"'||''||'"'
    ||',"h":'||(select '['||trim(',' from clobagg(json||','))||']' as data
                                from hard h where h.s1_location=d2.s1_location)
    ||'}' json
    , d2.*
  FROM (select s1_location, max(s2_area) as s2_area from portal_device_tree group by s1_location) d2
)

,area as
(
  select '{'
    ||'"n":"'||translite(d3.s2_area)||'"'
    ||',"c":"'||''||'"'
    ||',"l":'||(select '['||trim(',' from clobagg(json||','))||']' as data
                                from location l where l.s2_area=d3.s2_area)
    ||'}' json
    , d3.*
  FROM (select s2_area, max(s2_region) as s2_region from portal_device_tree group by s2_area) d3
)
,region as
(
  select ('{'
    ||'"name":"'||translite(d4.s2_region)||'"'
    ||',"area":'||(select '['||trim(',' from clobagg(json||','))||']' as data
                                from area a where a.s2_region=d4.s2_region)
    ||'}') json
    , d4.*
  FROM (select s2_region from portal_device_tree where s2_region is not null group by s2_region) d4
)
select ('{"device":['
      ||(select trim(',' from clobagg(json||',')) as data
                                from region)
      || ']}') as json
      into param
from dual;

outParam := param;
end;