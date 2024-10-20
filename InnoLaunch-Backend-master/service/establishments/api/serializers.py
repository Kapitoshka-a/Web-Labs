from rest_framework import serializers
from .models import (Establishment, Comment, Amenity,
                     EstablishmentImage, Service, Address, PriceCategory)


class PriceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceCategory
        fields = ('price_range',)


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['city', 'street', 'build_number']


class EstablishmentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstablishmentImage
        fields = ('image',)


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ('name', 'description')


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('name',)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        exclude = ('establishment', 'is_active')


class EstablishmentListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='establishment-detail', lookup_field='slug')
    address = AddressSerializer(read_only=True)
    price_category = PriceCategorySerializer(read_only=True)
    images = EstablishmentImageSerializer(many=True, read_only=True)

    class Meta:
        model = Establishment
        fields = ('name', 'type', 'work_mobile_number', 'url', 'address', 'price_category',
                  'images', 'is_recommended',)


class EstablishmentDetailSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(read_only=True, )
    total_comments_number = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='establishment-detail', lookup_field='slug')
    address = AddressSerializer(read_only=True)
    price_category = PriceCategorySerializer(read_only=True)
    amenities = AmenitySerializer(many=True, read_only=True)
    services = ServiceSerializer(many=True, read_only=True)
    images = EstablishmentImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Establishment
        exclude = ('slug', 'id')

    @staticmethod
    def get_total_comments_number(obj):
        return obj.comments.count()
