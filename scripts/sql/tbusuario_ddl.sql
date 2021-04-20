--------------------------------------------------------
--  Arquivo criado - Sexta-feira-Fevereiro-26-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table TB_USUARIO
--------------------------------------------------------

  CREATE TABLE "APP_INSTITUCIONAL"."TB_USUARIO" 
   (	"ID" NUMBER(*,0) GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"NOME" VARCHAR2(100 BYTE), 
	"DATA_CADASTRO" DATE, 
	"NOME_USUARIO" VARCHAR2(50 BYTE), 
	"SENHA_HASH" BLOB, 
	"SENHA_SALT" BLOB, 
	"ATIVO" CHAR(1 BYTE) DEFAULT 1, 
	"USUARIO_ROOT" CHAR(1 BYTE) DEFAULT 0
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "CTSAPP_INSTIT" 
 LOB ("SENHA_HASH") STORE AS SECUREFILE (
  TABLESPACE "CTSAPP_INSTIT" ENABLE STORAGE IN ROW CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES 
  STORAGE(INITIAL 106496 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)) 
 LOB ("SENHA_SALT") STORE AS SECUREFILE (
  TABLESPACE "CTSAPP_INSTIT" ENABLE STORAGE IN ROW CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES 
  STORAGE(INITIAL 106496 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)) ;
--------------------------------------------------------
--  DDL for Index PK_TB_USUARIO
--------------------------------------------------------

  CREATE UNIQUE INDEX "APP_INSTITUCIONAL"."PK_TB_USUARIO" ON "APP_INSTITUCIONAL"."TB_USUARIO" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS NOLOGGING 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "CTSAPP_INSTIT" ;
--------------------------------------------------------
--  Constraints for Table TB_USUARIO
--------------------------------------------------------

  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO" MODIFY ("NOME" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO" MODIFY ("DATA_CADASTRO" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO" MODIFY ("ATIVO" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO" ADD CONSTRAINT "PK_TB_USUARIO" PRIMARY KEY ("ID")
  USING INDEX "APP_INSTITUCIONAL"."PK_TB_USUARIO"  ENABLE;
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO" MODIFY ("NOME_USUARIO" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO" MODIFY ("USUARIO_ROOT" NOT NULL ENABLE);