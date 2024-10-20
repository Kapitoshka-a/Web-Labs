from django.urls import path
from .views import (EstablishmentsList, EstablishmentDetail,
                    CommentListCreate, CommentDetail, HomePageView)

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('establishments/', EstablishmentsList.as_view(), name='establishments'),
    path('establishments/<slug:slug>/', EstablishmentDetail.as_view(), name='establishment-detail'),
    path('establishments/<slug:slug>/comments/', CommentListCreate.as_view(), name='comment-list'),
    path('establishments/<slug:slug>/comments/<int:pk>', CommentDetail.as_view(), name='comment-detail'),
]
