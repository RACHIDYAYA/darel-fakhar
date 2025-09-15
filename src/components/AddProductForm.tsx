import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AddProductFormProps {
  onSuccess?: () => void;
}

const AddProductForm = ({ onSuccess }: AddProductFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { categories, addProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    name_fr: '',
    description_ar: '',
    description_en: '',
    description_fr: '',
    price: '',
    sale_price: '',
    category: '',
    stock: '',
    is_featured: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5); // Max 5 images
      setImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImageToStorage = async (file: File, index: number): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${index}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name_ar || !formData.name_en || !formData.price || !formData.category) {
      toast({
        title: t('common.error'),
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      // Upload images to Supabase storage
      const imageUrls: string[] = [];
      
      for (let i = 0; i < images.length; i++) {
        try {
          const url = await uploadImageToStorage(images[i], i);
          imageUrls.push(url);
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast({
            title: t('common.error'),
            description: `Failed to upload image ${i + 1}`,
            variant: 'destructive',
          });
        }
      }

      const productData = {
        name_ar: formData.name_ar,
        name_en: formData.name_en,
        name_fr: formData.name_fr,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        description_fr: formData.description_fr,
        price: parseFloat(formData.price),
        sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        is_featured: formData.is_featured,
        images: imageUrls,
      };

      const { error } = await addProduct(productData);
      
      if (error) {
        throw new Error(error);
      }

      toast({
        title: t('common.success'),
        description: 'Product added successfully',
      });

      // Reset form
      setFormData({
        name_ar: '',
        name_en: '',
        name_fr: '',
        description_ar: '',
        description_en: '',
        description_fr: '',
        price: '',
        sale_price: '',
        category: '',
        stock: '',
        is_featured: false,
      });
      setImages([]);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : 'Failed to add product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          إضافة منتج جديد / Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name_ar">اسم المنتج (العربية) *</Label>
              <Input
                id="name_ar"
                value={formData.name_ar}
                onChange={(e) => handleInputChange('name_ar', e.target.value)}
                placeholder="اسم المنتج بالعربية"
                required
              />
            </div>
            <div>
              <Label htmlFor="name_en">Product Name (English) *</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => handleInputChange('name_en', e.target.value)}
                placeholder="Product name in English"
                required
              />
            </div>
            <div>
              <Label htmlFor="name_fr">Nom du produit (Français)</Label>
              <Input
                id="name_fr"
                value={formData.name_fr}
                onChange={(e) => handleInputChange('name_fr', e.target.value)}
                placeholder="Nom du produit en français"
              />
            </div>
          </div>

          {/* Product Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="description_ar">الوصف (العربية)</Label>
              <Textarea
                id="description_ar"
                value={formData.description_ar}
                onChange={(e) => handleInputChange('description_ar', e.target.value)}
                placeholder="وصف المنتج بالعربية"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="description_en">Description (English)</Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => handleInputChange('description_en', e.target.value)}
                placeholder="Product description in English"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="description_fr">Description (Français)</Label>
              <Textarea
                id="description_fr"
                value={formData.description_fr}
                onChange={(e) => handleInputChange('description_fr', e.target.value)}
                placeholder="Description du produit en français"
                rows={3}
              />
            </div>
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="price">السعر / Price (MAD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="sale_price">سعر البيع / Sale Price (MAD)</Label>
              <Input
                id="sale_price"
                type="number"
                step="0.01"
                value={formData.sale_price}
                onChange={(e) => handleInputChange('sale_price', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="category">الفئة / Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة / Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name_ar} / {category.name_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stock">المخزون / Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Images Upload */}
          <div>
            <Label>صور المنتج / Product Images (Max 5)</Label>
            <div className="mt-2">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className="flex items-center gap-2 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors"
              >
                <Upload className="h-5 w-5" />
                انقر لإضافة الصور / Click to add images
              </Label>
            </div>
            
            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Featured Product */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => handleInputChange('is_featured', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="is_featured">منتج مميز / Featured Product</Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'جاري الإضافة...' : 'إضافة المنتج / Add Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;