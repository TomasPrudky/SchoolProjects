Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName System.Device

# Vytvoření okna
$Window = New-Object System.Windows.Window
$Window.Title = "Předpověď počasí"
$Window.Width = 900
$Window.Height = 300
$Window.ResizeMode = "NoResize"
$Window.SizeToContent = "WidthAndHeight"
$Window.WindowStartupLocation = "CenterScreen"
$Window.WindowStyle = "SingleBorderWindow"

# Icon
$iconPath = Join-Path $PSScriptRoot "weather.ico"
if (Test-Path $iconPath) {
    $icon = New-Object System.Windows.Media.Imaging.BitmapImage
    $icon.BeginInit()
    $icon.UriSource = New-Object System.Uri($iconPath)
    $icon.EndInit()
    $Window.Icon = $icon
} else {
    Write-Warning "File '$iconPath' not found."
}

# Vytvoření gridu pro umístění ovládacích prvků
$Grid = New-Object System.Windows.Controls.Grid

# Definice sloupců a řádků
$Grid.ColumnDefinitions.Add((New-Object System.Windows.Controls.ColumnDefinition))
$Grid.ColumnDefinitions.Add((New-Object System.Windows.Controls.ColumnDefinition))
$Grid.ColumnDefinitions.Add((New-Object System.Windows.Controls.ColumnDefinition))

$Grid.RowDefinitions.Add((New-Object System.Windows.Controls.RowDefinition))
$Grid.RowDefinitions.Add((New-Object System.Windows.Controls.RowDefinition))
$Grid.RowDefinitions.Add((New-Object System.Windows.Controls.RowDefinition))
$Grid.RowDefinitions.Add((New-Object System.Windows.Controls.RowDefinition))

$Window.Content = $Grid

# Vytvoření popisků
$Label1 = New-Object System.Windows.Controls.Label
$Label1.Content = "Aktuální město:"
$Label1.Margin = "10"
$Label1.VerticalAlignment = "Center"
$Label1.FontSize = "14"
$Label1.FontWeight = "Bold"
$Grid.Children.Add($Label1)

$Label2 = New-Object System.Windows.Controls.Label
$Label2.Content = "Aktuální počasí:"
$Label2.Margin = "10"
$Label2.VerticalAlignment = "Center"
$Label2.FontSize = "14"
$Label2.FontWeight = "Bold"
$Grid.Children.Add($Label2)

$Label3 = New-Object System.Windows.Controls.Label
$Label3.Content = "Aktuální teplota:"
$Label3.Margin = "10"
$Label3.VerticalAlignment = "Center"
$Label3.FontSize = "14"
$Label3.FontWeight = "Bold"
$Grid.Children.Add($Label3)

# Vytvoření textových polí pro zobrazení výsledků
$TextBox1 = New-Object System.Windows.Controls.TextBox
$TextBox1.Margin = "10"
$TextBox1.Width = "200"
$TextBox1.VerticalContentAlignment = "Center"
$Grid.Children.Add($TextBox1)

$TextBox2 = New-Object System.Windows.Controls.TextBox
$TextBox2.Margin = "10"
$TextBox2.Width = "200"
$TextBox2.VerticalContentAlignment = "Center"
$Grid.Children.Add($TextBox2)

$TextBox3 = New-Object System.Windows.Controls.TextBox
$TextBox3.Margin = "10"
$TextBox3.Width = "200"
$TextBox3.VerticalContentAlignment = "Center"
$Grid.Children.Add($TextBox3)

# Tlačítko pro spuštění skriptu
$Button = New-Object System.Windows.Controls.Button
$Button.Content = "Zobrazit"
$Button.Margin = "10"
$Button.Height = "40"
$Button.FontSize = "16"
$Button.FontWeight = "Bold"
$Button.Background = "DarkGray"
$Button.Foreground = "White"
$Button.BorderBrush = "Transparent"

# Vytvoření obrázku
$Image = New-Object System.Windows.Controls.Image
$Image.Width = 200
$Image.Height = 200

# Přidání obrázku do Gridu
$Grid.Children.Add($Image)

# Nastavení pozice prvků v gridu
$Label1.SetValue([System.Windows.Controls.Grid]::RowProperty, 0)
$Label1.SetValue([System.Windows.Controls.Grid]::ColumnProperty, 0)

$Label2.SetValue([System.Windows.Controls.Grid]::RowProperty, 1)
$Label2.SetValue([System.Windows.Controls.Grid]::ColumnProperty, 0)

$Label3.SetValue([System.Windows.Controls.Grid]::RowProperty, 2)
$Label3.SetValue([System.Windows.Controls.Grid]::ColumnProperty, 0)

$TextBox1.SetValue([System.Windows.Controls.Grid]::RowProperty, 0)
$TextBox1.SetValue([System.Windows.Controls.Grid]::ColumnProperty, 1)

$TextBox2.SetValue([System.Windows.Controls.Grid]::RowProperty, 1)
$TextBox2.SetValue([System.Windows.Controls.Grid]::ColumnProperty, 1)
$TextBox2.IsReadOnly = $True

$TextBox3.SetValue([System.Windows.Controls.Grid]::RowProperty, 2)
$TextBox3.SetValue([System.Windows.Controls.Grid]::ColumnProperty, 1)
$TextBox3.IsReadOnly = $True

$Button.SetValue([System.Windows.Controls.Grid]::RowProperty, 3)
$Button.SetValue([System.Windows.Controls.Grid]::ColumnProperty, 0)
$Button.SetValue([System.Windows.Controls.Grid]::ColumnSpanProperty, 3)


$Image.SetValue([System.Windows.Controls.Grid]::RowProperty, 0)
$Image.SetValue([System.Windows.Controls.Grid]::ColumnProperty, 3)
$Image.SetValue([System.Windows.Controls.Grid]::RowSpanProperty, 3)
$Image.VerticalAlignment = "Center"
$Image.HorizontalAlignment = "Center"


$Button.Add_Click({

    $latitude = ''
    $longitude = ''
    $city = $TextBox1.Text
    
    if($TextBox1.Text -ne ""){
    
        # Přihlášení k OpenCage Geocoder API
        $apiKey = "API_KEY"
        $baseUri = "https://api.opencagedata.com/geocode/v1/json"

        # Vytvoření URL pro dotaz API
        $url = $baseUri + "?q=$city&key=$apiKey&language=en&pretty=1"

        Write-Host $url

        # Odeslání dotazu API
        $response = Invoke-RestMethod -Uri $url
        
        # Získání latitude a longitude z odpovědi API
        $latitude = $response.results[0].geometry.lat
        $longitude = $response.results[0].geometry.lng

    }else{

        # CITY 
        Add-Type -AssemblyName System.Device
        $watcher = New-Object System.Device.Location.GeoCoordinateWatcher
        $watcher.Start()

        while (($watcher.Status -ne "Ready") -and ($watcher.Permission -ne "Denied")) {
            Start-Sleep -Milliseconds 100
        }

        if ($watcher.Permission -eq "Denied") {
            [System.Windows.MessageBox]::Show("Přístup k polohovým službám byl zamítnut.")

            $watcher = New-Object System.Device.Location.GeoCoordinateWatcher
            Write-Host $watcher.Permission

            if ($watcher.Permission -ne 'Granted') {
                $startInfo = New-Object System.Diagnostics.ProcessStartInfo
                $startInfo.FileName = 'ms-settings:privacy-location'
                $startInfo.UseShellExecute = $true
                [System.Diagnostics.Process]::Start($startInfo) | Out-Null

                while ($watcher.Permission -ne 'Granted') {
                    Start-Sleep -Milliseconds 500
                }
            }

            Write-Host "Přístup k poloze je povolen."



            break
        } else {
            $latitude = $watcher.Position.Location.Latitude
            $longitude = $watcher.Position.Location.Longitude
            Write-Host "Zeměpisná šířka: $($latitude)"
            Write-Host "Zeměpisná délka: $($longitude)"

            # Nastavení klíče API pro zjištění Města
            $apiKey = "b9dfd172dfc143e6bdc2ddfa1e9d8480"
    
            # Nastavení URL pro získání města na základě souřadnic
            $url = "https://api.opencagedata.com/geocode/v1/json?q=$latitude+$longitude&key=$apiKey&language=en&pretty=1"

            # Získání dat z API
            $response = Invoke-RestMethod -Uri $url -Verbose

            # Vypsání města na základě geografických koordinát
            $city = $response.results[0].components.suburb
            Write-Host "Aktuální město: $city"
            
        }    
    }

        # Nastavení klíče API pro počasí
    $apiKey = "7737b33c968483a4ce37168baefcf58f"
    $url = "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey&lang=cz&units=metric"
    
    try {
        # Získání dat z API
        $response = Invoke-RestMethod $url -Verbose
    } catch [System.Net.WebException] {
        if ($_.Exception.Response.StatusCode.value__ -eq 404) {
            [System.Windows.MessageBox]::Show("Nejspíše jste zadali špatný název města.")
            return
        } else {
            [System.Windows.MessageBox]::Show("Nastala neočekávaná chyba: $($_.Exception.Message)")
        }

        
        Write-Host 'Latitude: ' $latitude + ' longitude: '$longitude

        if($latitude -ne '' -and $longitude -ne ''){
            $urlLatLon = "https://api.openweathermap.org/data/2.5/weather?lat=$latitude&lon=$longitude&appid=$apiKey&lang=cz&units=metric"
            $response = Invoke-RestMethod $urlLatLon -Verbose

            $city = "$($response.sys.country)" + ", $($response.name)"
        }

    }

    # Vypsání aktuálního počasí
    $weather = "$($response.weather[0].description)"
    $temperature = "$($response.main.temp)°C"
    $TextBox1.Text = $city
    $TextBox2.Text = $weather
    $TextBox3.Text = $temperature
    $wcode = "$($response.weather[0].icon)"
    $Image.Source = New-Object System.Windows.Media.Imaging.BitmapImage -ArgumentList "https://openweathermap.org/img/wn/$wcode@4x.png"

})


$Grid.Children.Add($Button)

# Zobrazení okna
$Window.ShowDialog() | Out-Null
