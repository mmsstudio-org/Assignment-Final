import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getLandlordProperties } from '@/lib/actions/property.actions';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return <p>Not authorized</p>;
  }

  const myProperties = await getLandlordProperties(session.user.id);

  return (
    <div>
       <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Properties</h1>
        <Button asChild>
          <Link href="/dashboard/add-property">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Listings</CardTitle>
          <CardDescription>Here you can view, edit, or delete your properties.</CardDescription>
        </CardHeader>
        <CardContent>
          {myProperties.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">City</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myProperties.map(property => (
                  <TableRow key={property._id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Property image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={property.images[0]}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell><Badge variant="outline">Published</Badge></TableCell>
                    <TableCell>${property.price.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{property.city}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center py-10">
              <h3 className="text-lg font-semibold">No properties found</h3>
              <p className="text-muted-foreground">You haven't added any properties yet.</p>
              <Button asChild className="mt-4">
                 <Link href="/dashboard/add-property">Add Your First Property</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
