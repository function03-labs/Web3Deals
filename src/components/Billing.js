import React from 'react';

const BillingForm = () => {
    const handleSubmit = event => {
        event.preventDefault();
        // Handle what happens when form is submitted here
        // e.g., upgrade user to PRO plan
        console.log('Upgrading to PRO');
    };

    return (
        <div className="grid items-start gap-4 mt-10">
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className="font-heading text-3xl md:text-4xl">Billing</h1>
                    <p className="text-lg text-muted-foreground">
                        Manage billing and your subscription plan.
                    </p>
                </div>
            </div>
            <div className="grid gap-8">
                <form onSubmit={handleSubmit}>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-lg font-semibold leading-none text-[#fb2056] tracking-tight">
                                Subscription Plan
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                You are currently on the <strong>Free</strong> plan.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.
                        </div>
                        <div className="p-6 pt-0 flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
                            <button
                                type="submit"
                                className="inline-flex border items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                                Upgrade to PRO
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BillingForm;
