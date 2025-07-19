'use client';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {ITEM_PER_PAGE} from '@/constants';
import {useQueryUser} from '@/hook/data/admin';
import {UserStateType} from '@/types';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Loader2,
	MoreHorizontal,
	NewspaperIcon,
} from 'lucide-react';
import {useState} from 'react';
import UserDialog from './user-dialog';

export default function UserTable() {
	const {results: users, isLoading, loadMore, status} = useQueryUser();
	const [selectedUser, setSelectedUser] = useState<UserStateType>();
	const [open, setOpen] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const totalPages = Math.ceil(users.length / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentData = users.slice(startIndex, endIndex);

	const goToFirstPage = () => setCurrentPage(1);
	const goToLastPage = () => setCurrentPage(totalPages);
	const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
	const goToNextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

	return (
		<>
			<div className="w-full flex flex-col items-center gap-4">
				<div className="w-full overflow-auto ">
					<Table>
						<TableCaption>
							<Button
								disabled={isLoading || status === 'Exhausted'}
								onClick={() => {
									loadMore(ITEM_PER_PAGE);
								}}
								className="gap-2">
								{isLoading ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<NewspaperIcon className="h-4 w-4" />
								)}
								{status === 'LoadingMore'
									? 'Loading...'
									: status === 'Exhausted'
										? 'No more Users'
										: 'Load more'}
							</Button>
						</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50px]">Avatar</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={6} className="h-24 text-center">
										<Loader2 className="h-6 w-6 animate-spin mx-auto" />
										Loading users...
									</TableCell>
								</TableRow>
							) : users.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="h-24 text-center">
										No users found.
									</TableCell>
								</TableRow>
							) : (
								currentData.map(user => (
									<TableRow key={user._id}>
										<TableCell className="flex justify-center">
											<Avatar className="size-8">
												<AvatarImage
													className="object-cover"
													src={user.image || '/placeholder.svg'}
													alt={user.name}
												/>
												<AvatarFallback>
													{user.name.charAt(0)}
												</AvatarFallback>
											</Avatar>
										</TableCell>
										<TableCell className="font-medium truncate">
											{user.name}
										</TableCell>
										<TableCell className="truncate">{user.email}</TableCell>
										<TableCell>
											<Badge
												variant={
													user.role === 'super_admin'
														? 'default'
														: user.role === 'admin'
															? 'secondary'
															: 'outline'
												}>
												{user.role || 'user'}
											</Badge>
										</TableCell>
										<TableCell>
											{user.locked ? (
												<Badge variant="destructive">Locked</Badge>
											) : (
												<Badge>Active</Badge>
											)}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" className="h-8 w-8 p-0">
														<span className="sr-only">Open menu</span>
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() => {
															setOpen(true);
															setSelectedUser(user);
														}}>
														View Profile
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{users?.length > 0 && (
					<div className="space-y-4 w-full">
						{/* Status Display */}
						<div className="text-center text-sm text-muted-foreground">
							Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of{' '}
							{users.length} users
						</div>

						{/* Mobile Pagination */}
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
							{/* Page Size Selector */}
							<div className="flex items-center space-x-2">
								<p className="text-sm font-medium whitespace-nowrap">
									Rows per page
								</p>
								<Select
									value={`${pageSize}`}
									onValueChange={value => {
										setPageSize(Number(value));
										setCurrentPage(1);
									}}>
									<SelectTrigger className="h-8 w-[70px]">
										<SelectValue placeholder={pageSize} />
									</SelectTrigger>
									<SelectContent side="top">
										{[5, 10, 20, 30, 40, 50].map(size => (
											<SelectItem key={size} value={`${size}`}>
												{size}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* Page Info */}
							<div className="text-sm font-medium">
								Page {currentPage} of {totalPages}
							</div>

							{/* Navigation Buttons */}
							<div className="flex items-center space-x-1">
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 bg-transparent"
									onClick={goToFirstPage}
									disabled={currentPage === 1}>
									<span className="sr-only">Go to first page</span>
									<ChevronsLeft className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 bg-transparent"
									onClick={goToPreviousPage}
									disabled={currentPage === 1}>
									<span className="sr-only">Go to previous page</span>
									<ChevronLeft className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 bg-transparent"
									onClick={goToNextPage}
									disabled={currentPage === totalPages}>
									<span className="sr-only">Go to next page</span>
									<ChevronRight className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 bg-transparent"
									onClick={goToLastPage}
									disabled={currentPage === totalPages}>
									<span className="sr-only">Go to last page</span>
									<ChevronsRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
			{selectedUser && <UserDialog user={selectedUser} open={open} setOpen={setOpen} />}
		</>
	);
}
