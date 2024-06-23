import ErrorHandler from "../pages/Inner/components/handlers/Error/ErrorHandler";
import LoadingSpinner from "../pages/Inner/components/handlers/Loading/LoadingSpinner";

export const renderSpinner = (loading) => loading && <LoadingSpinner />;

export const renderError = (error) => error && <ErrorHandler error={error} />;
