import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

const UserActions = ({ onClose, isLoggedIn }) => {
  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      localStorage.removeItem("jwt");
      router.push("/logout");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6 bg-black/40">
      <div className="bg-white p-8 rounded-xl shadow-2xl relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold mb-4">User Actions</h2>
        <div className="flex flex-col items-center space-y-4">
          {isLoggedIn ? (
            <Link href="/logout" onClick={handleClick}>
              <p>
                <span className="mr-2">🚪</span> Logout
              </p>
            </Link>
          ) : (
            <div>
              <Link href="/login">
                <p className="hover:bg-slate-300 p-2 rounded-lg text-lg">
                  <span className="mr-2">🔑</span> Login
                </p>
              </Link>

              <Link href="/register">
                <p className="hover:bg-slate-300 p-2 rounded-lg text-lg">
                  <span className="mr-2">✍️</span> Register
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActions;

UserActions.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
