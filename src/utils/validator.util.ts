export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePasswordLength = (password: string): boolean => {
    return password.length >= 8;
};

export const validatePasswordSpecialChar = (password: string): boolean => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(password);
};

export const validatePasswordEmpty = (password: string): boolean => {
    return password.length != 0 ? true : false;
};


export const validateRegister = (
    nombres: string,
    email: string,
    password: string,
    confirm: string
): string | null => {
    if (!nombres.trim()) {
        return "Ingresa tus nombres";
    }
    if (!validateEmail(email)) {
        return "Ingresa un correo valido";
    }
    if (!validatePasswordLength(password)) {
        return "La contrasña debe tener al menos 8 caracteres";
    }
    if (!validatePasswordSpecialChar(password)) {
        return "La contraseña debe incluir un caracter especial";
    }
    if (password !== confirm) {
        return "Las contraseñas no coinciden";
    }
    return null;
};


export const validateLogin = (
    email: string,
    password: string
): string | null => {
    if (!validateEmail(email)) {
        return "ingresa un correo válido";
    }
    if (!validatePasswordEmpty(password)) {
        return "la contraseña no puede estar vacia";
    }
    return null;
};
