This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


// from django.db import models
// from django.utils import timezone

// class Consultation(models.Model):
//     """
//     Represents a client consultation request for Mide's Atelier.
//     """

//     # 👤 Client Info
//     first_name = models.CharField(max_length=150)
//     last_name = models.CharField(max_length=150)
//     email = models.EmailField()
//     phone = models.CharField(max_length=11, blank=True)

//     # 🪡 Service Type
//     SERVICE_CHOICES = [
//         ("bridal", "Bridal Services"),
//         ("bespoke", "Bespoke Fashion & Couture"),
//         ("ready_to_wear", "Ready-to-Wear Collections"),
//         ("corporate", "Corporate & Power Dressing"),
//         ("styling", "Styling & Image Consulting"),
//         ("alterations", "Alterations & Restyling"),
//         ("cultural", "Cultural & Heritage Design"),
//     ]
//     service_type = models.CharField(max_length=50, choices=SERVICE_CHOICES)

//     # 🗓️ Scheduling
//     preferred_datetime = models.DateTimeField(null=True, blank=True)

//     STATUS_CHOICES = [
//         ("pending", "Pending"),
//         ("scheduled", "Scheduled"),
//         ("completed", "Completed"),
//         ("cancelled", "Cancelled"),
//     ]
//     status = models.CharField(
//         max_length=20, choices=STATUS_CHOICES, default="pending"
//     )

//     # 📝 Optional Notes
//     notes = models.TextField(blank=True)

//     # ✅ Confirmations
//     confirm_interest = models.BooleanField(
//         default=False,
//         verbose_name="I confirm my interest in booking a consultation with Mide’s Atelier",
//         help_text="Indicates that the client has confirmed their interest in proceeding with a consultation.",
//     )
//     understand_availability = models.BooleanField(
//         default=False,
//         verbose_name="I understand that consultations are by appointment and subject to availability",
//         help_text="Indicates that the client understands consultations are appointment-based and subject to availability.",
//     )

//     # ⏰ Audit Fields
//     created_at = models.DateTimeField(default=timezone.now)
//     updated_at = models.DateTimeField(auto_now=True)

//     class Meta:
//         ordering = ["-created_at"]
//         verbose_name = "Consultation"
//         verbose_name_plural = "Consultations"

//     def __str__(self):
//         return f"{self.first_name} {self.last_name} - {self.get_service_type_display()}"
