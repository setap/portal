create or replace procedure json(outParam out CLOB) 
is
clob_data CLOB;
begin

with hard as 
(
  select DISTINCT '{ '
    ||' "name":"'||d1.device||'"'
    ||'}' json
    , d1.*
  FROM (select DISTINCT * from device) d1
)
, location as
(
  select DISTINCT '{ '
    ||' "name":"'||d2.location||'"'
    ||', "hard":"'||(select DISTINCT '['||REPLACE(REPLACE(
                                       REPLACE(
                                         XMLAGG(
                                           XMLELEMENT("A",json)
                                         ORDER BY 1).getClobVal(),
                                       '<A>',''),
                                     '</A>',','),'quot;','')
                                   ||']' as data
                                from hard h where h.location=d2.location)
    ||'}' json
    , d2.*
  FROM (select location, max(area) as area from device group by location) d2
)
,area as
(
  select '{ '
    ||' "name":"'||d3.area||'"'
    ||', "location":"'||(select DISTINCT '['||REPLACE(
                                       REPLACE(
                                         XMLAGG(
                                           XMLELEMENT("A",json)
                                         ORDER BY 1).getClobVal(),
                                       '<A>',''),
                                     '</A>',',')
                                   ||']' as data
                                from location l where l.area=d3.area)
    ||'}' json
    , d3.*
  FROM (select area, max(region) as region from device group by area) d3
)

,region as
(
  select '{ '
    ||' "name":"'||d4.region||'"'
    ||', "area":"'||(select '['||REPLACE(
                                       REPLACE(
                                         XMLAGG(
                                           XMLELEMENT("A",json)
                                         ORDER BY 1).getClobVal(),
                                       '<A>',''),
                                     '</A>',',')||']'  as data
                                from area a where a.region=d4.region)
    ||'}' json
    , d4.*
  FROM (select region from device group by region) d4
)

select ('{"device" : ['
      ||(select '['|| REPLACE(
                                       REPLACE(
                                         XMLAGG(
                                           XMLELEMENT("A",json)
                                         ORDER BY 1).getClobVal(),
                                       '<A>',''),
                                     '</A>',',')||']'  as data
                                from region)
      || ']}')
      into clob_data;
from dual;
outParam := clob_data
end json;