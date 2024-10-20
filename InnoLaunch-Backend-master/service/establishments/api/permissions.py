from rest_framework import permissions


class IsAdminOrReadOnly(permissions.IsAdminUser):
    """Permission to only allow admins to redact something"""
    def has_permission(self, request, view):
        """Check whether the user is admin"""
        admin_permission = bool(request.user and request.user.is_staff)
        if request.method in permissions.SAFE_METHODS:
            return True
        return admin_permission
