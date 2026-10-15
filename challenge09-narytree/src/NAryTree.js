
export class NAryNode {
  constructor(title, link = "#", component = null) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = []; // Referencia a N hijos
  }

  addChild(childNode) {
    this.children.push(childNode);
    return childNode;
  }
}

export const createMenuTree = () => {
  const root = new NAryNode("Menú Principal", "/");

  const profile = root.addChild(new NAryNode("Profile", "/profile", "Vista de Perfil de Usuario"));
  profile.addChild(new NAryNode("Security & Privacy", "/profile/security", "Configuración de Seguridad y Privacidad"));
  profile.addChild(new NAryNode("Password", "/profile/password", "Módulo para Cambiar Contraseña"));
  profile.addChild(new NAryNode("Notification", "/profile/notifications", "Preferencias de Notificaciones"));

  const messages = root.addChild(new NAryNode("Messages", "/messages", "Centro de Mensajes e Inboxes"));
  messages.addChild(new NAryNode("Direct Messages", "/messages/direct", "Bandeja de Mensajes Directos"));
  messages.addChild(new NAryNode("Archived", "/messages/archived", "Histórico de Mensajes Archivados"));

  const settings = root.addChild(new NAryNode("Settings", "/settings", "Panel General de Configuración"));
  settings.addChild(new NAryNode("Account", "/settings/account", "Gestión de Cuenta"));
  
  const help = root.addChild(new NAryNode("Help", "/help", "Centro de Ayuda y Soporte"));
  help.addChild(new NAryNode("Submit a Ticket", "/help/ticket", "Formulario para Enviar Ticket de Soporte"));
  help.addChild(new NAryNode("Network Status", "/help/status", "Monitoreo del Estado de la Red"));

  root.addChild(new NAryNode("Logout", "/logout", "Módulo de Salida / Cerrar Sesión"));

  return root;
};