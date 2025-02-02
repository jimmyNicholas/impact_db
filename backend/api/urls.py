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
    path("results/<str:class_name>/", views.ResultViewSet.as_view({"get": "list"})),
    path("result/", views.ResultViewSet.as_view({
        "post": "create"
    })),
    path("result/<int:pk>/", views.ResultViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update"
    })),
    *router.urls,
]