from rest_framework import serializers
from .models import Info

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = (
            'id',
            'user',
            'lost_found',
            'title',
            'campus',
            'building',
            'latitude',
            'longitude',
            'address',
            'location',
            'date',
            'item',
            'color',
            'image',
            'content',
            'create_date',
            'update_date'
        )