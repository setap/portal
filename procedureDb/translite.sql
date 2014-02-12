create or replace FUNCTION translite (ru IN varchar2) RETURN VARCHAR2
IS

OUT_ST VARCHAR2(100);
  translit varchar2(4000);
begin

  translit := translate (upper(ru),'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЭЫЬЮЯ','ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567');


  out_st := translit;
  return(out_st);
end;