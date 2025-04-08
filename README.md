# NodeJs ile Kafka Bağlantısı ve Mesaj Gönderip Okuma Örneği

Bu örnek ile nodejs kullanarak Kafka'nın özelliklerini öğreniyoruz.

Proje içinde var olan dosyaların açıklamaları ve Kafka'nın kurulumu ile ilgili gerekli olan docker dosyası aşağıdaki gibidir;

## Kafka Kurulumu;

Kafkanın local ortamda docker üzerinden kurulması için aşağıdaki repoyu inceleyebilirsiniz.

## Proje Dosyaları ve Çalıştırılması

### Projenin Çalıştırılması

Proje dosyalarını kendi bilgisayarınıza indirdikten sonra izlenmesi gereken adımlar;

**Warning**  Projenin bilgisayarınız da çalışması için nodejs'in kurulu olduğundan emin olun.

1) Proje dosyalarını çalışmak istediğiniz klasöre taşıyın ve terminal üzerinden bu dizine gidin. Bunun için çalıştığınız işletim sisteminin terminal komutlarını kullanmanız gerekmektedir.

2) Proje dizinine gidin. ```cd Proje_Klasoru```

3) ```npm install``` komutu ile package.json içinde tanımlı olan bağımlılıklar yüklenecektir. Kurulum işlemi bittikten sonra ```node_modules``` adında bir klasör oluşacaktır. 

4) Artık hazırız. Proje de tanımlı olan her bir servisi terminal üzerinden ayrı ayrı çalıştıracağız.

Projede toplamda 3 ana servisimiz bulunmaktadır. Bunlar;

1) Order Service
2) User Service
3) Mailer Service

Yukarıda bahsei geçen dosyalarda bir eticaret sistemin de olması gereken iş süreçleri bulunmamaktadır. Amacımız Kafka'nın yapabildiklerini görmek olduğu için sadece bu kısımlara odaklanılmıştır. 

### Order Service
