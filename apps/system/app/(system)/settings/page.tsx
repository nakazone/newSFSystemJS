export const dynamic = 'force-dynamic'

export default function SettingsPage() {
  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ marginBottom: 24, color: '#1a2036', fontSize: 22, fontWeight: 700 }}>Settings</h1>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#333', paddingBottom: 10, borderBottom: '2px solid #e2e8f0' }}>
          Configuração do painel
        </h2>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 15 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>Usuários admin</label>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            O primeiro usuário admin é criado via variável de ambiente <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>ADMIN_PASSWORD</code> e script <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>npm run create-admin</code> (email: leads@senior-floors.com).
          </p>
          <p style={{ fontSize: 14, color: '#333', marginTop: 8 }}><strong>Status:</strong> Autenticação por sessão ativa.</p>
        </div>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 15 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>Título do sistema</label>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>Senior Floors System (alterável em configuração do projeto).</p>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#333', paddingBottom: 10, borderBottom: '2px solid #e2e8f0' }}>
          CRM
        </h2>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 15 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>Leads e banco de dados</label>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            Os leads são salvos no MySQL. Configure <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>DATABASE_URL</code> no .env (ou nas variáveis de ambiente do Netlify).
          </p>
          <p style={{ fontSize: 14, color: '#333', marginTop: 8 }}><strong>Módulos:</strong> CRM - Leads, Pipeline, Visitas, Orçamentos, Customers, Projects, Coupons, Users.</p>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#333', paddingBottom: 10, borderBottom: '2px solid #e2e8f0' }}>
          Informações do sistema
        </h2>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 15 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>Data/hora do servidor</label>
          <p style={{ fontSize: 14, color: '#333', marginTop: 5 }}>{new Date().toLocaleString('pt-BR')}</p>
        </div>
      </section>

      <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: 15, borderRadius: 6, marginTop: 20 }}>
        <h3 style={{ marginBottom: 10, color: '#0369a1' }}>Segurança</h3>
        <ul style={{ marginLeft: 20, color: '#64748b', fontSize: 14, lineHeight: 1.8 }}>
          <li>Altere a senha padrão após o primeiro acesso.</li>
          <li>Use senha forte (letras, números e símbolos).</li>
          <li>Não compartilhe credenciais publicamente.</li>
          <li>Faça logout ao terminar o uso do painel.</li>
        </ul>
      </div>
    </div>
  )
}
