import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';
import { toast } from 'sonner';
import { LogOut, Trash2, Image as ImageIcon, Map } from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout, token } = useAdmin();
  const navigate = useNavigate();
  
  const [gallery, setGallery] = useState([]);
  const [packages, setPackages] = useState([]);

  // Form states
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [pkgFile, setPkgFile] = useState<File | null>(null);
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgDuration, setPkgDuration] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
    } else {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const [galRes, pkgRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/gallery`),
        axios.get(`${import.meta.env.VITE_API_URL}/packages`)
      ]);
      setGallery(galRes.data);
      setPackages(pkgRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile) return;

    const formData = new FormData();
    formData.append('image', galleryFile);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Gallery image uploaded');
      setGalleryFile(null);
      fetchData();
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  const handlePackageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgFile || !pkgTitle || !pkgDuration) return;

    const formData = new FormData();
    formData.append('image', pkgFile);
    formData.append('title', pkgTitle);
    formData.append('duration', pkgDuration);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/packages`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Tour package created');
      setPkgFile(null);
      setPkgTitle('');
      setPkgDuration('');
      fetchData();
    } catch (err) {
      toast.error('Creation failed');
    }
  };

  const deleteGalleryImage = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/gallery/${id}`);
      toast.success('Image deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const deletePackage = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/packages/${id}`);
      toast.success('Package deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-secondary/20 p-4 md:p-8 font-sans text-foreground">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-background p-6 rounded-2xl shadow-sm border border-border">
          <div>
            <h1 className="text-2xl font-bold font-heading">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back, {admin.username}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Gallery Management */}
          <section className="bg-background p-6 rounded-2xl shadow-sm border border-border">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2 mb-6">
              <ImageIcon className="w-5 h-5 text-primary" /> Manage Gallery
            </h2>
            
            <form onSubmit={handleGalleryUpload} className="mb-8 p-4 bg-secondary/30 rounded-xl">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Upload New Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setGalleryFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm"
                  required
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 transition">
                Upload to Gallery
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 h-96 overflow-y-auto pr-2">
              {gallery.map((img: any) => (
                <div key={img._id} className="relative group rounded-lg overflow-hidden border border-border">
                  <img src={`http://localhost:5000${img.imageUrl}`} alt="Gallery" className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => deleteGalleryImage(img._id)} className="p-2 bg-destructive text-white rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Packages Management */}
          <section className="bg-background p-6 rounded-2xl shadow-sm border border-border">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2 mb-6">
              <Map className="w-5 h-5 text-primary" /> Manage Packages
            </h2>
            
            <form onSubmit={handlePackageUpload} className="mb-8 p-4 bg-secondary/30 rounded-xl space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Package Title</label>
                <input 
                  type="text" 
                  value={pkgTitle}
                  onChange={(e) => setPkgTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border"
                  placeholder="e.g. Goa Tour Package"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input 
                  type="text" 
                  value={pkgDuration}
                  onChange={(e) => setPkgDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border"
                  placeholder="e.g. 3 Days"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Package Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setPkgFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm"
                  required
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 transition">
                Create Package
              </button>
            </form>

            <div className="space-y-4 h-80 overflow-y-auto pr-2">
              {packages.map((pkg: any) => (
                <div key={pkg._id} className="flex items-center gap-4 p-3 border border-border rounded-xl">
                  <img src={`http://localhost:5000${pkg.imageUrl}`} alt={pkg.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{pkg.title}</h3>
                    <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                  </div>
                  <button onClick={() => deletePackage(pkg._id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
