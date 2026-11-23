import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setTasks([]);
      return;
    }

    fetchTasks();
    loadAvatar(session.user.id);

    const channel = supabase
      .channel('tasks-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  // --- AUTH ---
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('¡Usuario registrado! Ahora haz clic en Iniciar Sesión.');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAvatarUrl('');
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !session) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `${session.user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    setAvatarUrl(data.publicUrl);
  };

  const loadAvatar = async (userId) => {
    const { data } = await supabase.storage.from('avatars').list(userId, {
      limit: 1,
      sortBy: { column: 'created_at', order: 'desc' },
    });
    if (data && data.length > 0) {
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(`${userId}/${data[0].name}`);
      setAvatarUrl(urlData.publicUrl);
    }
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const { error } = await supabase.from('tasks').insert([{ title: newTask }]);
    if (error) alert(error.message);
    else setNewTask('');
  };

  const toggleComplete = async (task) => {
    await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', task.id);
  };

  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return;
    await supabase.from('tasks').update({ title: editingTitle }).eq('id', id);
    setEditingId(null);
    setEditingTitle('');
  };

  const deleteTask = async (id) => {
    await supabase.from('tasks').delete().eq('id', id);
  };

  if (!session) {
    return (
      <div style={{ maxWidth: 400, margin: '3rem auto', fontFamily: 'sans-serif' }}>
        <h2>Challenge 10 - Supabase</h2>
        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
          <button type="button" onClick={handleSignUp}>Registrarse</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 550, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              width={50}
              height={50}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#ccc' }} />
          )}
          <div>
            <strong>{session.user.email}</strong>
            <div>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} />
            </div>
          </div>
        </div>
        <button onClick={handleSignOut}>Cerrar sesión</button>
      </header>

      <hr style={{ margin: '1.5rem 0' }} />

      <form onSubmit={addTask} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />

            {editingId === task.id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={() => saveEdit(task.id)}>Guardar</button>
                <button onClick={() => setEditingId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
                <button onClick={() => { setEditingId(task.id); setEditingTitle(task.title); }}>
                  Editar
                </button>
                <button onClick={() => deleteTask(task.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}