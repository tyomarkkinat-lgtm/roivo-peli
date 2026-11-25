# Tekee englanninkielisen sivun en/index.html suomenkielisestä index.html-tiedostosta.
# Aja aina, kun index.html muuttuu:  python3 build_en.py
import re,os
base='https://tyomarkkinat-lgtm.github.io/roivo-peli/'
s=open('index.html',encoding='utf-8').read()
s=s.replace('<html lang="fi">','<html lang="en">',1)
s=s.replace('<head>','<head>\n<base href="../">\n<script>window.RBS_LANG=\'en\'</script>',1)
s=re.sub(r'<meta name="description"[^>]*>','<meta name="description" content="How well do you lead your company’s IT? Four game worlds: security, integrations, IT costs and IT leadership. Play in your browser.">',s)
s=re.sub(r'<meta property="og:description"[^>]*>','<meta property="og:description" content="How well do you lead your company’s IT? Four game worlds in your browser. Roivo, IT leadership consultancy.">',s)
s=s.replace(f'content="{base}og.jpg"',f'content="{base}og-en.jpg"')
s=re.sub(r'<meta property="og:url"[^>]*>',f'<meta property="og:url" content="{base}en/">',s)
s=s.replace('<meta property="og:locale" content="fi_FI">','<meta property="og:locale" content="en_GB">')
os.makedirs('en',exist_ok=True)
open('en/index.html','w',encoding='utf-8').write(s)
print('en/index.html ok')
