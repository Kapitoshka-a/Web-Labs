from django.db import models

TYPE_CHOICES = (
    ('Storage', 'Storage'),
    ('Sql-DB', 'SQL-DB'),
    ('NO-Sql-DB', 'NO-Sql-DB'),
)

class Service(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    price = models.IntegerField()
    type = models.CharField(max_length=12, choices=TYPE_CHOICES, default='Storage')
    image = models.ImageField(upload_to='images')
    
    def __str__(self):
        return self.title


class Cart(models.Model):
    houses = models.ManyToManyField("Service", related_name="carts")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.houses.__str__()



class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    house = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="cart_items")
    rental_days = models.PositiveIntegerField(default=1)
    performance = models.CharField(
        max_length=50,
        choices=[("Basic", "Basic"), ("Middle", "Middle"), ("High", "High"), ("Optimized", "Optimized")],
        default="Basic",
    )  # New field for performance

    class Meta:
        unique_together = ('cart', 'house', 'performance')  # Ensure unique combination

    def __str__(self):
        return f"{self.house.title} in Cart #{self.cart.id} ({self.performance}) for {self.rental_days} days"
