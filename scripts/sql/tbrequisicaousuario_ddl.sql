--------------------------------------------------------
--  Arquivo criado - Sexta-feira-Fevereiro-26-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table TB_REQUISICAO_USUARIO
--------------------------------------------------------

  CREATE TABLE "APP_INSTITUCIONAL"."TB_REQUISICAO_USUARIO" 
   (	"ID" NUMBER(*,0) GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"NOME" VARCHAR2(150 BYTE), 
	"NOME_USUARIO" VARCHAR2(100 BYTE), 
	"TOKEN" VARCHAR2(100 BYTE), 
	"DATA_CADASTRO" DATE, 
	"SUCESSO" CHAR(20 BYTE), 
	"EXPIRADO" CHAR(20 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "CTSAPP_INSTIT" ;
--------------------------------------------------------
--  DDL for Index PK_TB_REQUISIAO_USUARIO
--------------------------------------------------------

  CREATE UNIQUE INDEX "APP_INSTITUCIONAL"."PK_TB_REQUISIAO_USUARIO" ON "APP_INSTITUCIONAL"."TB_REQUISICAO_USUARIO" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS NOLOGGING 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "CTSAPP_INSTIT" ;
--------------------------------------------------------
--  Constraints for Table TB_REQUISICAO_USUARIO
--------------------------------------------------------

  ALTER TABLE "APP_INSTITUCIONAL"."TB_REQUISICAO_USUARIO" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_REQUISICAO_USUARIO" MODIFY ("NOME_USUARIO" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_REQUISICAO_USUARIO" MODIFY ("TOKEN" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_REQUISICAO_USUARIO" MODIFY ("DATA_CADASTRO" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_REQUISICAO_USUARIO" MODIFY ("SUCESSO" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_REQUISICAO_USUARIO" MODIFY ("EXPIRADO" NOT NULL ENABLE);
