import smtplib
from config import EMAIL_USE_TLS, EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD

def send_mail(email, msg):
    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        if EMAIL_USE_TLS:
            server.starttls()
        
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        server.sendmail(EMAIL_HOST_USER, email, msg.as_string())

        info = {
            'success': True,
            'info': 'Send email successful. Please check email.'
        }
    except:
        info = {
            'success': False,
            'info': 'Send email failed. Please try again later.'
        }
    finally:
        server.quit()

    return info