export default function UserPage() {
	return (
		// This page is for the course management section of the admin panel.
		<main className="flex flex-col w-screen ">
			<section className="min-h-[calc(100vh-64px)] bg-secondary mx-2 lg:mx-64  flex flex-col  ">
				<span className="text-2xl font-semibold">User Management</span>
				<p className="text-sm text-muted-foreground">
					Manage users, roles, and permissions.
				</p>
			</section>
		</main>
	);
}
