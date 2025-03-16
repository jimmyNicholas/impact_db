from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('class', views.ClassViewSet, basename='class')
router.register('student', views.StudentViewSet, basename='student')
router.register('assessment', views.AssessmentViewSet, basename='assessment')
router.register('assessment-type', views.AssessmentTypeViewSet, basename='assessment-type')
router.register('course-type', views.CourseTypeViewSet, basename='course-type')
router.register('special-value', views.SpecialValueViewSet, basename='special-value')

urlpatterns = router.urls