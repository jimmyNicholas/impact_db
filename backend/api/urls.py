from django.urls import path
from . import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("class", views.ClassViewSet)
router.register("student", views.StudentViewSet)
router.register("result", views.ResultViewSet)

urlpatterns = router.urls

urlpatterns = [
    path("class/<str:class_name>/", views.ClassViewSet.as_view({"get": "list"})),
    path("student/<str:student_id>/", views.StudentViewSet.as_view({"get": "list"})),
    path("result/<str:class_name>/", views.ResultViewSet.as_view({"get": "list"})),
    *router.urls,
]
