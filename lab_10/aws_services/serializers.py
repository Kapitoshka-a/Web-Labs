from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ('id', 'title', 'description', 'price', 'type', 'image', 'image_url')

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url  
        return None
    
    def validate_title(self, value):
        
        house_id = self.instance.id if self.instance else None
        if Service.objects.exclude(id=house_id).filter(title=value).exists():
            raise serializers.ValidationError("An item with this title already exists.")
        return value