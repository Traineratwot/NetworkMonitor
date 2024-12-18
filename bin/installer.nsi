!define PRODUCT_NAME "Network Monitor"
!define PRODUCT_VERSION "1.0.0"
!define PRODUCT_PUBLISHER "Your Name"
!define PRODUCT_URL "http://yourwebsite.com"

OutFile "..\dist\win\network_monitor_installer.exe"
InstallDir "$PROGRAMFILES64\Network Monitor"

Section "MainSection" SEC01
    SetOutPath "$INSTDIR"
    File "..\dist\win\network_monitor.exe"
    
    # Создание службы
    ExecWait '"$INSTDIR\network_monitor.exe" install'
    
    # Установка службы
    nsExec::ExecToStack 'sc create "NetworkMonitor" binPath= "$INSTDIR\network_monitor.exe" start= auto'
    nsExec::ExecToStack 'sc start "NetworkMonitor"'
SectionEnd

Section "Uninstall"
    # Удаление службы
    nsExec::ExecToStack 'sc stop "NetworkMonitor"'
    nsExec::ExecToStack 'sc delete "NetworkMonitor"'
    
    # Удаление файлов
    RMDir /r "$INSTDIR"
SectionEnd