--------------------------------------------------------
--  Arquivo criado - Sexta-feira-Fevereiro-26-2021   
--------------------------------------------------------
REM INSERTING into APP_INSTITUCIONAL.TB_PERFIL
SET DEFINE OFF;
Insert into APP_INSTITUCIONAL.TB_PERFIL (ID,DESCRICAO,DATA_CADASTRO,PRIORIDADE) values ('1','Administrador',to_date('08/11/20','DD/MM/RR'),'1');
Insert into APP_INSTITUCIONAL.TB_PERFIL (ID,DESCRICAO,DATA_CADASTRO,PRIORIDADE) values ('21','Editor',to_date('12/11/20','DD/MM/RR'),'1');
Insert into APP_INSTITUCIONAL.TB_PERFIL (ID,DESCRICAO,DATA_CADASTRO,PRIORIDADE) values ('22','Colaborador',to_date('12/11/20','DD/MM/RR'),'1');
Insert into APP_INSTITUCIONAL.TB_PERFIL (ID,DESCRICAO,DATA_CADASTRO,PRIORIDADE) values ('23','Visualizador',to_date('12/11/20','DD/MM/RR'),'1');
commit;
