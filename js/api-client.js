// Единая точка для работы с API (Open Server Panel / PHP)
// Важно: никаких localStorage. Всё хранение — на сервере.

const API = (() => {
  const base = 'api/';

  async function request(path, { method = 'GET', body = null, headers = {} } = {}) {
    const opts = { method, headers: { ...headers } };
    if (body !== null) {
      opts.headers['Content-Type'] = 'application/json; charset=utf-8';
      opts.body = JSON.stringify(body);
    }

    const res = await fetch(base + path, { ...opts, credentials: 'include', cache: 'no-store' });
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // если сервер отдал файл (CSV) — тут не должен быть json
      throw new Error('Некорректный ответ сервера');
    }

    if (!res.ok || !data || data.ok === false) {
      const msg = (data && (data.message || data.error)) ? (data.message || data.error) : 'Ошибка сервера';
      const err = new Error(msg);
      err.payload = data;
      err.status = res.status;
      throw err;
    }

    return data;
  }

  return {
    get: (path) => request(path, { method: 'GET' }),
    post: (path, body) => request(path, { method: 'POST', body }),
    download: (path) => {
      // Для файлов (CSV) — открываем в новой вкладке
      window.open(base + path, '_blank');
    }
  };
})();
