@echo off
set IMAGE_NAME=landing_page
set REGISTRY_URL=2.24.203.37:30500
set FULL_TAG=%REGISTRY_URL%/%IMAGE_NAME%:latest

echo ==========================================
echo INICIANDO ATUALIZACAO DA LANDING PAGE
echo ==========================================
echo.

echo [1/3] Gerando nova imagem Docker...
docker build -t %IMAGE_NAME%:latest .
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao gerar a imagem Docker.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Tagueando imagem para o servidor...
docker tag %IMAGE_NAME%:latest %FULL_TAG%
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao taguear a imagem.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Enviando para o servidor remoto (Push)...
docker push %FULL_TAG%
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO: Falha ao enviar a imagem. Verifique sua conexao ou VPN.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ==========================================
echo SUCESSO! A LP FOI ENVIADA PARA O SERVIDOR.
echo ==========================================
echo.
pause
