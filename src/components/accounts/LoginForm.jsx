import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import useAuth from 'components/hooks/useAuth';
import useFieldValues from 'components/hooks/useFieldValues';
import useLocalStorage from 'components/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

// https://tailwindcomponents.com/component/login-form-14

const INIT_FIELD_VALUES = { username: '', password: '' };

function LoginForm() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const [{ loading, error }, requestToken] = useApiAxios(
    {
      url: 'http://127.0.0.1:8000/accounts/api/token/',
      method: 'POST',
    },
    {
      manual: true,
    },
  );
  const { handleFieldChange, fieldValues } = useFieldValues(INIT_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({ data: fieldValues }).then((response) => {
      const { access, refresh, username, first_name, last_name } =
        response.data;

      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        username,
        first_name,
        last_name,
      });

      console.log(response.data);
      navigate('/news/');
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-800 flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
          <div className="text-white mt-10">
            <h1 className="font-bold text-4xl">Welcome</h1>
            <p className="font-semibold">Let's Login!</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-8 mt-10"
          >
            <input
              type="text"
              name="username"
              onChange={handleFieldChange}
              value={fieldValues.username}
              placeholder="Username"
              className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500 text-white"
            />
            <input
              type="password"
              name="password"
              onChange={handleFieldChange}
              value={fieldValues.password}
              placeholder="******************"
              className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500 text-white"
            />
            <button className="border border-indigo-100 bg-indigo-100 text-white rounded-lg py-3 font-semibold">
              Submit
            </button>
          </form>
        </div>
      </div>

      <DebugStates fieldValues={fieldValues} auth={auth} />
    </div>
  );
}

export default LoginForm;
