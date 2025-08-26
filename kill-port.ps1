param(
  [int]$Port = 8080
)

# PowerShellスクリプト: kill-port.ps1
# 指定したポート番号でLISTENしているプロセスを全て強制終了します

$lines = netstat -ano | Select-String ":$Port"
foreach ($line in $lines) {
  $parts = $line -split '\s+'
  $myPid = $parts[-1]
  if ($myPid -match '^[0-9]+$') {
    try {
      Write-Host "Killing PID $myPid on port $Port..."
      taskkill /PID $myPid /F | Out-Null
    } catch {
      Write-Host "Failed to kill PID $myPid"
    }
  }
}
Write-Host "Done."
