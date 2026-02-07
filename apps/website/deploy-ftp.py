#!/usr/bin/env python3
"""
Script de Deploy Automatizado via FTP para Hostinger
Uso: python3 deploy-ftp.py
"""

import os
import sys
import getpass
from ftplib import FTP

def upload_file(ftp, local_file, remote_file):
    """Faz upload de um arquivo via FTP"""
    try:
        with open(local_file, 'rb') as f:
            ftp.storbinary(f'STOR {remote_file}', f)
        return True
    except Exception as e:
        print(f"❌ Erro ao fazer upload de {local_file}: {e}")
        return False

def upload_directory(ftp, local_dir, remote_dir):
    """Faz upload recursivo de uma pasta"""
    try:
        # Criar diretório remoto se não existir
        try:
            ftp.mkd(remote_dir)
        except:
            pass  # Diretório já existe
        
        ftp.cwd(remote_dir)
        
        for item in os.listdir(local_dir):
            local_path = os.path.join(local_dir, item)
            remote_path = item
            
            if os.path.isfile(local_path):
                print(f"  📄 Enviando {item}...")
                upload_file(ftp, local_path, remote_path)
            elif os.path.isdir(local_path):
                print(f"  📁 Criando pasta {item}/...")
                upload_directory(ftp, local_path, remote_path)
                ftp.cwd('..')
        
        return True
    except Exception as e:
        print(f"❌ Erro ao fazer upload da pasta {local_dir}: {e}")
        return False

def main():
    print("🚀 Deploy Automatizado - Senior Floors")
    print("=" * 50)
    print()
    
    # Verificar se a pasta php existe
    if not os.path.exists('php'):
        print("❌ Pasta 'php/' não encontrada!")
        sys.exit(1)
    
    # Solicitar credenciais FTP
    print("📋 Informe as credenciais FTP da Hostinger:")
    print()
    ftp_host = input("🌐 Host FTP (ex: ftp.senior-floors.com): ").strip()
    ftp_user = input("👤 Username FTP: ").strip()
    ftp_pass = getpass.getpass("🔒 Password FTP: ")
    ftp_path = input("📁 Caminho remoto (ex: /public_html/newsite): ").strip()
    
    if not ftp_path.startswith('/'):
        ftp_path = '/' + ftp_path
    
    print()
    print(f"🔌 Conectando a {ftp_host}...")
    
    try:
        # Conectar ao FTP
        ftp = FTP(ftp_host)
        ftp.login(ftp_user, ftp_pass)
        print("✅ Conectado!")
        print()
        
        # Navegar até o diretório remoto
        print(f"📂 Navegando para {ftp_path}...")
        try:
            ftp.cwd(ftp_path)
        except:
            # Tentar criar o diretório
            print(f"📁 Criando diretório {ftp_path}...")
            parts = ftp_path.strip('/').split('/')
            current_path = ''
            for part in parts:
                current_path += '/' + part
                try:
                    ftp.mkd(current_path)
                except:
                    pass
            ftp.cwd(ftp_path)
        
        print("✅ No diretório correto!")
        print()
        
        # Fazer upload da pasta php
        print("📤 Fazendo upload dos arquivos...")
        print()
        upload_directory(ftp, 'php', '.')
        
        print()
        print("✅ Deploy concluído com sucesso!")
        print()
        print("🔧 Próximos passos:")
        print("   1. Configure permissão 755 na pasta 'data/' via File Manager")
        print("   2. Teste o site: https://www.senior-floors.com/newsite/")
        print()
        
        ftp.quit()
        
    except Exception as e:
        print()
        print(f"❌ Erro: {e}")
        print()
        print("💡 Alternativa: Use o File Manager da Hostinger")
        print("   1. Acesse: https://hpanel.hostinger.com")
        print("   2. Files → File Manager")
        print("   3. Faça upload do arquivo deploy-package.zip")
        print("   4. Extraia o ZIP")
        sys.exit(1)

if __name__ == '__main__':
    main()
