create or replace procedure json(l_data out varchar2) 
is
begin

with manager as 
(
  select '{ '
    ||' "name":"'||ename||'"'
    ||', "salary":'||sal
    ||'}' json
    , emp.*
  FROM emp
)
, employee as
(
  select '{ '
    ||' "name":"'||ename||'"'
    ||', "salary":'||sal
    ||', "job":"'||job||'"'
    ||', "manager":'||case when mgr is null then '"' else (select json from manager mgr where mgr.empno=emp.mgr) end
    ||'}' json
    ,emp.*
    from emp
)
, department as
(
  select '{ '
    ||' "name":"'||dname||'"'
    ||', "identifier":"'||deptno||'"'
    ||', "location":"'||loc||'"'
    ||', "employees":'||(select '['||listagg(json,',') within group (order by 1)||']' as data
                                from employee emp where emp.deptno=dept.deptno)
    ||'}' json
    from dept
)

select ('{"company" : ['
      || (select listagg ( json, ',')
                  within group (order by 1)
          from department
         )
      || ']}')
      into l_data
from dual;
htp.p(l_data);
end json;

