import React, { useState } from 'react';
import {useSession} from 'next-auth/react'

const SettingsForm = () => {
    const {data:session}=useSession();
    const [name, setName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const user = session.user; // This is just a mock, replace with actual user id.

    const handleSubmit = async event => {
        event.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="grid items-start gap-4 mt-5 sm:mt-10 px-4 sm:px-0">
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className="font-heading text-3xl md:text-4xl">Settings</h1>
                    <p className="text-lg text-muted-foreground">
                        Manage account and website settings.
                    </p>
                </div>
            </div>
            <div className="grid gap-10">
                <form onSubmit={handleSubmit}>
                    <div className="rounded border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-lg text-[#fb2056] font-semibold leading-none tracking-tight">
                                Your Name
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Please enter your full name or a display name you are comfortable with.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="grid gap-1">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="flex h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[400px] "
                                    id="name"
                                    size="32"
                                    name="name"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                    disabled={isSaving}
                                />
                                {error && <p className="error">{error}</p>}
                            </div>
                        </div>
                        <div className="flex items-center p-6 pt-0">
                            <button
                                type="submit"
                                className="inline-flex border items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsForm;
