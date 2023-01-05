$date = (Get-Date -format "yyyyMMddhhmmss");$tipoinstallManual = 0;if ($args.Count -lt 1){   $pathlog = "\instaladorCarePlus\"+$date+"loginstall_GMUD_202212290800_Institucional_Normal.txt";   Start-Transcript -path $pathlog;    $tipoinstall = Read-Host "Escolha o tipo de instalacao, H = UAT, S = Pre-Producao e P = Producao";    $tipoinstallManual = 1;} else {    $param1 = $args[0];     if ($null -eq $param1) {        $pathlog = "\instaladorCarePlus\"+$date+"loginstall_GMUD_202212290800_Institucional_Normal.txt";        Start-Transcript -path $pathlog;         $tipoinstall = Read-Host "Escolha o tipo de instalacao, H = UAT, S = Pre-Producao e P = Producao";         $tipoinstallManual = 1;    } else {         if (($param1 -eq "P") -or ($param1 -eq "H") -or ($param1 -eq "S") ) {                $pathlog = "N";                $tipoinstall = $param1;         } else {               $pathlog = "\instaladorCarePlus\"+$date+"loginstall_GMUD_202212290800_Institucional_Normal.txt";               Start-Transcript -path $pathlog;                $tipoinstall = Read-Host "Escolha o tipo de instalacao, H = UAT, S = Pre-Producao e P = Producao";                $tipoinstallManual = 1;        }    }}if (($tipoinstall -eq "P") -or ($tipoinstall -eq "S") -or ($tipoinstall -eq "H")) {if (($tipoinstallManual) -or ($tipoinstall -eq "P")) {   $dirProcesso = "instaladorCarePlus";} else { if ($tipoinstall -eq "S") {           $dirProcesso = "instaladorpreprod";} else { if  ($tipoinstall -eq "H") {          $dirProcesso = "instaladoruat";}}}$param2 = Get-Content -Path .\oracle.txt;if ($null -ne $param2) { $pathlog = "\instaladorCarePlus\"+$date+"loginstall_GMUD_202212290800_Institucional_Normal.txt"; Start-Transcript -path $pathlog;  $passkey = $param2[0];  $passReleasekey = $param2[1];}Try{$programas = ,@();$contador = 0;Write-Output "Registrando instalacao do pacote GMUD_202212290800_Institucional_Normal.";$programas += ,@("careplus-institucional",0,"E:\http\careplus\dist",48,1942);for($contador = 0; $contador -lt $programas.Length; $contador++) { if ($programas[$contador][0]){Write-Output "Atualizando as versoes no banco de dados...";$sql = "set hea OFF;`n";$sql += "UPDATE APP_SYSCARE.CADPROG SET VERPROG_CADPROG=" + $($programas[$contador][3]) + " WHERE LOWER(NOMPROG_CADPROG) =LOWER('" + $($programas[$contador][0]) + "');`n";If($tipoinstall.ToUpper() -eq "P") {$res = ($sql|sqlplus -s app_deploy/\`"$($passReleasekey)\`"@BRDC01ORC-001.careplus.intranet:1522/care); } else { If($tipoinstall.ToUpper() -eq "H") {$res = ($sql|sqlplus -s app_deploy/\`"$($passkey)\`"@BRDC01ORC-500.careplus.intranet:1521/cp_uat); } else { $res = ($sql|sqlplus -s app_deploy/\`"$($passkey)\`"@BRDC01ORC-500.careplus.intranet:1521/cp_pr_prod); } } Write-Output $res;Write-Output "Registrando data de Instalacao do programa...";$sql = "set hea OFF;`n";$sql += "UPDATE app_deploy.tb_installPACOTE SET DATAIMPLANTACAO = SYSDATE WHERE CODIGO = 11481;`n";If($tipoinstall.ToUpper() -eq "P") {$res = ($sql|sqlplus -s app_deploy/\`"$($passReleasekey)\`"@BRDC01ORC-001.careplus.intranet:1522/care);} Else { If(($tipoinstall.ToUpper() -eq "H")) {$res = ($sql|sqlplus -s app_deploy/\`"$($passkey)\`"@BRDC01ORC-500.careplus.intranet:1521/cp_uat); } else { If($tipoinstall.ToUpper() -eq "S") {$res = ($sql|sqlplus -s app_deploy/\`"$($passkey)\`"@BRDC01ORC-500.careplus.intranet:1521/cp_pr_prod); }} } Write-Output $res;If(($tipoinstall.ToUpper() -eq "H")) {$sql = "set hea OFF;`n";Write-Output "Registrando data de UAT do pacote...";$sql = "set hea OFF;`n";$sql += "UPDATE app_deploy.tb_installPACOTE SET DATAQA = SYSDATE, STATUS = 5 WHERE CODIGO = 11481;`n";$res = ($sql|sqlplus -s app_deploy/\`"$($passReleasekey)\`"@BRDC01ORC-001.careplus.intranet:1522/care);Write-Output $res; } else {If($tipoinstall.ToUpper() -eq "S") {Write-Output "Registrando data de PreProd do pacote...";$sql = "set hea OFF;`n";$sql += "UPDATE app_deploy.tb_installPACOTE SET datapreprod = SYSDATE, STATUS = 6 WHERE CODIGO = 11481;`n";$res = ($sql|sqlplus -s app_deploy/\`"$($passReleasekey)\`"@BRDC01ORC-001.careplus.intranet:1522/care);Write-Output $res; }}Write-Output "Registrando log de Instalacao do programa...";$sql = "set hea OFF;`n";$sql += "INSERT INTO app_deploy.tb_installLOG (CODIGO,CODPACOTE,DATA,ACAO,CODCONFIG) VALUES(app_deploy.SQ_INSTALLLOG.NEXTVAL,11481,sysdate,1,1942);`n";If($tipoinstall.ToUpper() -eq "P") {$res = ($sql|sqlplus -s app_deploy/\`"$($passReleasekey)\`"@BRDC01ORC-001.careplus.intranet:1522/care); } Else { If(($tipoinstall.ToUpper() -eq "H")) {$res = ($sql|sqlplus -s app_deploy/\`"$($passkey)\`"@BRDC01ORC-500.careplus.intranet:1521/cp_uat); } else { If($tipoinstall.ToUpper() -eq "S") {$res = ($sql|sqlplus -s app_deploy/\`"$($passkey)\`"@BRDC01ORC-500.careplus.intranet:1521/cp_pr_prod); }} } Write-Output $res;}} Write-Output "Instalacao registrada";}Catch{ Write-Output $_.Exception.GetType().FullName, $_.Exception.Message }} else {Write-Output "Parametro invalido: " $param; Write-Output "Fim da instalacao";}If ($pathlog -ne "N") { Stop-Transcript; }