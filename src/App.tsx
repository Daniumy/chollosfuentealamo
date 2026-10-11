import { runtimeConfig } from './runtime-config';
import { APP_VERSION } from './build-info';
import { chollos } from './chollos';
import './App.css';

export default function App() {
  return (
    <>
      {runtimeConfig.SHOW_ENV_BANNER && (
        <div className="env-banner" style={{ background: runtimeConfig.BANNER_COLOR }}>
          Entorno: {runtimeConfig.ENV_NAME.toUpperCase()}
        </div>
      )}

      <main>
        <h1>Chollos Fuente Álamo 🔥🔥🔥🔥🔥🔥</h1>
        <ul className="chollos">
          {chollos.map((c) => (
            <li key={c.id}>
              <div>
                <strong>{c.titulo}</strong>
                <small>{c.tienda}</small>
              </div>
              <span className="precio">
                {c.precio.toFixed(2)} € <s>{c.precioAntes.toFixed(2)} €</s>
              </span>
            </li>
          ))}
        </ul>
      </main>

      <footer>
        <a href={`mailto:${runtimeConfig.CONTACT_EMAIL}`}>{runtimeConfig.CONTACT_EMAIL}</a>
        {' · '}versión <code>{APP_VERSION}</code> · {runtimeConfig.ENV_NAME}
      </footer>
    </>
  );
}