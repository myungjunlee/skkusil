from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.
class Info(models.Model):
   user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
   lost_found = models.CharField(max_length=50)
   title = models.CharField(max_length=100)
   campus = models.CharField(max_length=50)
   building = models.CharField(max_length=50)
   date = models.DateField()
   item = models.CharField(max_length=10)
   color = models.CharField(max_length=10)
   image = models.ImageField(upload_to = "photos/%Y/%m/%d/", blank = True, null = True)
   content = models.TextField(blank = True, null = True)
   latitude = models.CharField(max_length=50, blank = True, null = True)
   longitude = models.CharField(max_length=50, blank = True, null = True)
   address = models.CharField(max_length=100, blank = True, null = True)
   location = models.CharField(max_length=100, blank = True, null = True)
   create_date = models.DateTimeField(default=timezone.localtime(timezone.now()))
   update_date = models.DateTimeField(default=timezone.localtime(timezone.now()))
   
   # database에는 media url 경로가 적히지 image가 저장되는 것이 아니다
   # upload_to는 업로드할 폴더를 지정하는 것이다
   # media 폴더 안에 blog 폴더 만들어서 안에 저장한 후 관리하겠다

   # 제목이 blog에서 노출되도록 만듦
   def __str__(self):
      return self.title