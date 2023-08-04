import React from 'react';

const SettingsForm = () => {
    const [name, setName] = React.useState("");

    const handleSubmit = event => {
        event.preventDefault();
        console.log(name);
        // Here you can handle what happens when form is submitted
        // Maybe send name to server or update it in your state management library
    };

    return (
        <div className="grid items-start gap-4 mt-10 ">
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
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
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
                                    className="flex h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[400px]"
                                    id="name"
                                    size="32"
                                    name="name"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center p-6 pt-0">
                            <button
                                type="submit"
                                className="inline-flex border items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsForm;
