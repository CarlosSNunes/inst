--------------------------------------------------------
--  Arquivo criado - Sexta-feira-Fevereiro-26-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table TB_USUARIO_PERFIL
--------------------------------------------------------

  CREATE TABLE "APP_INSTITUCIONAL"."TB_USUARIO_PERFIL" 
   (	"ID" NUMBER(*,0) GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"USUARIO_ID" NUMBER(*,0), 
	"PERFIL_ID" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "CTSAPP_INSTIT" ;
--------------------------------------------------------
--  DDL for Index PK_TB_USUARIO_PERFIL
--------------------------------------------------------

  CREATE UNIQUE INDEX "APP_INSTITUCIONAL"."PK_TB_USUARIO_PERFIL" ON "APP_INSTITUCIONAL"."TB_USUARIO_PERFIL" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS NOLOGGING 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "CTSAPP_INSTIT" ;
--------------------------------------------------------
--  Constraints for Table TB_USUARIO_PERFIL
--------------------------------------------------------

  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO_PERFIL" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO_PERFIL" MODIFY ("USUARIO_ID" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO_PERFIL" MODIFY ("PERFIL_ID" NOT NULL ENABLE);
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO_PERFIL" ADD CONSTRAINT "PK_TB_USUARIO_PERFIL" PRIMARY KEY ("ID")
  USING INDEX "APP_INSTITUCIONAL"."PK_TB_USUARIO_PERFIL"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table TB_USUARIO_PERFIL
--------------------------------------------------------

  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO_PERFIL" ADD CONSTRAINT "FK_TB_USUARIO_PERFIL_PERFIL_ID" FOREIGN KEY ("PERFIL_ID")
	  REFERENCES "APP_INSTITUCIONAL"."TB_PERFIL" ("ID") ENABLE;
  ALTER TABLE "APP_INSTITUCIONAL"."TB_USUARIO_PERFIL" ADD CONSTRAINT "FK_TB_USUARIO_PERFIL_USUARIO_ID" FOREIGN KEY ("USUARIO_ID")
	  REFERENCES "APP_INSTITUCIONAL"."TB_USUARIO" ("ID") ENABLE;
