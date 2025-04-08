# NodeJs ile Kafka Bağlantısı ve Mesaj Gönderip Okuma Örneği

Bu örnek ile nodejs kullanarak Kafka'nın özelliklerini öğreniyoruz.

Proje içinde var olan dosyaların açıklamaları ve Kafka'nın kurulumu ile ilgili gerekli olan docker dosyası aşağıdaki gibidir;

## Kafka Kurulumu;

Kafkanın local ortamda docker üzerinden kurulması için aşağıdaki repoyu inceleyebilirsiniz.

## Proje Dosyaları

Projede toplamda 3 ana servisimiz bulunmaktadır. Bunlar;

1) Order Service
2) User Service
3) Mailer Service

Yukarıda bahsei geçen dosyalarda bir eticaret sistemin de olması gereken iş süreçleri bulunmamaktadır. Amacımız Kafka'nın yapabildiklerini görmek olduğu için sadece bu kısımlara odaklanılmıştır. 

### Order Service
