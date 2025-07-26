
import React, { useState, useEffect } from 'react';
import { Puck, DropZone } from '@measured/puck';
import { ArrowLeft, Save, Eye, Palette, Layout, Settings, Zap, Target, TrendingUp, Users, Sparkles, Layers, Monitor, Smartphone, Tablet, Globe, Mail, MousePointer, Image, Type, Square, Circle, ArrowRight, Plus, Minus, Copy, Trash2, RotateCcw, RotateCw, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Link, Upload, BookOpen, FileText, Search, Filter, Clock, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Enhanced component configuration for Puck
const config = {
  components: {
    // Video Components
    VideoCarousel: {
      fields: {
        videos: {
          type: "array" as const,
          arrayFields: {
            title: { type: "text" as const, label: "Video Title" },
            videoUrl: { type: "text" as const, label: "Video URL" },
            thumbnail: { type: "text" as const, label: "Thumbnail URL" },
            description: { type: "textarea" as const, label: "Video Description" }
          }
        },
        autoPlay: { type: "radio" as const, options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
        showControls: { type: "radio" as const, options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
        loop: { type: "radio" as const, options: [{ label: "Yes", value: true }, { label: "No", value: false }] }
      },
      defaultProps: {
        videos: [
          {
            title: "Product Demo",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnail: "https://via.placeholder.com/400x300",
            description: "Watch how our product works"
          }
        ],
        autoPlay: false,
        showControls: true,
        loop: false
      },
      render: ({ videos, autoPlay, showControls, loop }) => (
        <div style={{ width: '100%', padding: '20px' }}>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', scrollBehavior: 'smooth' }}>
            {videos.map((video, index) => (
              <div key={index} style={{ minWidth: '400px', background: '#f8f9fa', borderRadius: '12px', overflow: 'hidden' }}>
                <iframe
                  width="400"
                  height="250"
                  src={`${video.videoUrl}${autoPlay ? '?autoplay=1' : ''}${loop ? '&loop=1' : ''}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={{ border: 'none' }}
                />
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>{video.title}</h3>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    VideoTestimonial: {
      fields: {
        testimonials: {
          type: "array" as const,
          arrayFields: {
            name: { type: "text" as const, label: "Customer Name" },
            title: { type: "text" as const, label: "Customer Title" },
            videoUrl: { type: "text" as const, label: "Video URL" },
            thumbnail: { type: "text" as const, label: "Thumbnail URL" },
            rating: { type: "text" as const, label: "Rating (1-5)" }
          }
        },
        layout: {
          type: "select" as const,
          options: [
            { label: "Grid", value: "grid" },
            { label: "Slider", value: "slider" }
          ]
        }
      },
      defaultProps: {
        testimonials: [
          {
            name: "Sarah Johnson",
            title: "Marketing Director",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnail: "https://via.placeholder.com/300x200",
            rating: "5"
          }
        ],
        layout: "grid"
      },
      render: ({ testimonials, layout }) => (
        <div style={{ width: '100%', padding: '40px 20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', fontWeight: 'bold' }}>
            What Our Customers Say
          </h2>
          <div style={{
            display: layout === 'grid' ? 'grid' : 'flex',
            gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(350px, 1fr))' : 'none',
            overflowX: layout === 'slider' ? 'auto' : 'visible',
            gap: '30px',
            scrollBehavior: 'smooth'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{
                minWidth: layout === 'slider' ? '350px' : 'auto',
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <iframe
                  width="100%"
                  height="200"
                  src={testimonial.videoUrl}
                  title={`${testimonial.name} testimonial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={{ border: 'none', borderRadius: '12px', marginBottom: '20px' }}
                />
                <div style={{ marginBottom: '15px' }}>
                  {'★'.repeat(parseInt(testimonial.rating))}{'☆'.repeat(5 - parseInt(testimonial.rating))}
                </div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold' }}>{testimonial.name}</h4>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>{testimonial.title}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },

    TestimonialSlider: {
      fields: {
        testimonials: {
          type: "array" as const,
          arrayFields: {
            quote: { type: "textarea" as const, label: "Quote" },
            author: { type: "text" as const, label: "Author Name" },
            title: { type: "text" as const, label: "Author Title" },
            image: { type: "text" as const, label: "Author Image URL" },
            rating: { type: "text" as const, label: "Rating (1-5)" },
            company: { type: "text" as const, label: "Company" }
          }
        },
        autoPlay: { type: "radio" as const, options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
        showDots: { type: "radio" as const, options: [{ label: "Yes", value: true }, { label: "No", value: false }] }
      },
      defaultProps: {
        testimonials: [
          {
            quote: "This product completely transformed our business. The results were immediate and sustainable.",
            author: "John Smith",
            title: "CEO",
            company: "TechCorp",
            image: "https://via.placeholder.com/80x80",
            rating: "5"
          },
          {
            quote: "Outstanding support and incredible value. Highly recommend to anyone serious about growth.",
            author: "Sarah Davis",
            title: "Marketing Director",
            company: "GrowthCo",
            image: "https://via.placeholder.com/80x80",
            rating: "5"
          }
        ],
        autoPlay: true,
        showDots: true
      },
      render: ({ testimonials, autoPlay, showDots }) => (
        <div style={{ width: '100%', padding: '60px 20px', background: '#f8fafc' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '50px', fontSize: '36px', fontWeight: 'bold' }}>Customer Success Stories</h2>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
              <div style={{
                display: 'flex',
                transition: 'transform 0.5s ease',
                animation: autoPlay ? 'slide 15s infinite' : 'none'
              }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} style={{
                    minWidth: '100%',
                    background: 'white',
                    padding: '60px 40px',
                    borderRadius: '20px',
                    margin: '0 10px'
                  }}>
                    <div style={{ marginBottom: '30px' }}>
                      {'★'.repeat(parseInt(testimonial.rating))}{'☆'.repeat(5 - parseInt(testimonial.rating))}
                    </div>
                    <blockquote style={{
                      fontSize: '24px',
                      fontStyle: 'italic',
                      marginBottom: '40px',
                      lineHeight: '1.6',
                      color: '#374151'
                    }}>
                      "{testimonial.quote}"
                    </blockquote>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>{testimonial.author}</div>
                        <div style={{ color: '#6b7280', fontSize: '16px' }}>{testimonial.title}</div>
                        <div style={{ color: '#9ca3af', fontSize: '14px' }}>{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {showDots && (
                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {testimonials.map((_, index) => (
                    <div key={index} style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#cbd5e1',
                      cursor: 'pointer'
                    }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },

    TestimonialGrid: {
      fields: {
        testimonials: {
          type: "array" as const,
          arrayFields: {
            quote: { type: "textarea" as const, label: "Quote" },
            author: { type: "text" as const, label: "Author Name" },
            title: { type: "text" as const, label: "Author Title" },
            image: { type: "text" as const, label: "Author Image URL" },
            rating: { type: "text" as const, label: "Rating (1-5)" }
          }
        },
        columns: {
          type: "select" as const,
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" }
          ]
        }
      },
      defaultProps: {
        testimonials: [
          {
            quote: "Exceptional service and results beyond expectations.",
            author: "Mike Johnson",
            title: "Founder",
            image: "https://via.placeholder.com/60x60",
            rating: "5"
          },
          {
            quote: "The best investment we've made for our business.",
            author: "Lisa Chen",
            title: "CMO",
            image: "https://via.placeholder.com/60x60",
            rating: "5"
          },
          {
            quote: "Outstanding support and incredible value for money.",
            author: "David Wilson",
            title: "CEO",
            image: "https://via.placeholder.com/60x60",
            rating: "5"
          }
        ],
        columns: "3"
      },
      render: ({ testimonials, columns }) => (
        <div style={{ width: '100%', padding: '50px 20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '32px', fontWeight: 'bold' }}>
            Trusted by Industry Leaders
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ marginBottom: '20px', color: '#fbbf24' }}>
                  {'★'.repeat(parseInt(testimonial.rating))}{'☆'.repeat(5 - parseInt(testimonial.rating))}
                </div>
                <blockquote style={{
                  fontSize: '16px',
                  marginBottom: '25px',
                  lineHeight: '1.6',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{testimonial.author}</div>
                    <div style={{ color: '#6b7280', fontSize: '12px' }}>{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    PricingTable: {
      fields: {
        plans: {
          type: "array" as const,
          arrayFields: {
            name: { type: "text" as const, label: "Plan Name" },
            price: { type: "text" as const, label: "Price" },
            period: { type: "text" as const, label: "Billing Period" },
            description: { type: "text" as const, label: "Description" },
            features: { type: "textarea" as const, label: "Features (one per line)" },
            buttonText: { type: "text" as const, label: "Button Text" },
            buttonUrl: { type: "text" as const, label: "Button URL" },
            highlighted: { type: "radio" as const, options: [{ label: "Yes", value: true }, { label: "No", value: false }] }
          }
        }
      },
      defaultProps: {
        plans: [
          {
            name: "Starter",
            price: "$29",
            period: "/month",
            description: "Perfect for small businesses",
            features: "Up to 1,000 contacts\nBasic email templates\nEmail support\n24/7 customer support",
            buttonText: "Get Started",
            buttonUrl: "#",
            highlighted: false
          },
          {
            name: "Pro",
            price: "$79",
            period: "/month",
            description: "Best for growing companies",
            features: "Up to 10,000 contacts\nAdvanced templates\nA/B testing\nPriority support\nAdvanced analytics",
            buttonText: "Choose Pro",
            buttonUrl: "#",
            highlighted: true
          },
          {
            name: "Enterprise",
            price: "$199",
            period: "/month",
            description: "For large organizations",
            features: "Unlimited contacts\nCustom templates\nDedicated manager\nAPI access\nCustom integrations",
            buttonText: "Contact Sales",
            buttonUrl: "#",
            highlighted: false
          }
        ]
      },
      render: ({ plans }) => (
        <div style={{ width: '100%', padding: '60px 20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '36px', fontWeight: 'bold' }}>
            Choose Your Plan
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(plans.length, 3)}, 1fr)`,
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {plans.map((plan, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px 30px',
                textAlign: 'center',
                border: plan.highlighted ? '3px solid #3b82f6' : '1px solid #e5e7eb',
                transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                boxShadow: plan.highlighted ? '0 20px 40px rgba(59,130,246,0.15)' : '0 4px 20px rgba(0,0,0,0.08)',
                position: 'relative' as const
              }}>
                {plan.highlighted && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#3b82f6',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{plan.name}</h3>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>{plan.description}</p>
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937' }}>{plan.price}</span>
                  <span style={{ color: '#6b7280' }}>{plan.period}</span>
                </div>
                <ul style={{ textAlign: 'left', marginBottom: '30px', listStyle: 'none', padding: 0 }}>
                  {plan.features.split('\n').map((feature, idx) => (
                    <li key={idx} style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.buttonUrl}
                  style={{
                    display: 'block',
                    padding: '15px 30px',
                    background: plan.highlighted ? '#3b82f6' : '#f3f4f6',
                    color: plan.highlighted ? 'white' : '#374151',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {plan.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      )
    },

    CountdownTimer: {
      fields: {
        title: { type: "text" as const, label: "Timer Title" },
        endDate: { type: "text" as const, label: "End Date (YYYY-MM-DD HH:MM)" },
        message: { type: "text" as const, label: "Urgency Message" },
        backgroundColor: { type: "text" as const, label: "Background Color" },
        textColor: { type: "text" as const, label: "Text Color" }
      },
      defaultProps: {
        title: "Limited Time Offer",
        endDate: "2024-12-31 23:59",
        message: "Don't miss out on this exclusive deal!",
        backgroundColor: "#1f2937",
        textColor: "#ffffff"
      },
      render: ({ title, endDate, message, backgroundColor, textColor }) => (
        <div style={{
          background: backgroundColor,
          color: textColor,
          padding: '40px 20px',
          textAlign: 'center',
          width: '100%'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>{title}</h2>
          <p style={{ marginBottom: '30px', fontSize: '16px' }}>{message}</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, index) => (
              <div key={unit} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '20px',
                borderRadius: '12px',
                minWidth: '80px'
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
                  {['23', '14', '27', '45'][index]}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>{unit}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    SocialProofBar: {
      fields: {
        message: { type: "text" as const, label: "Proof Message" },
        count: { type: "text" as const, label: "Customer Count" },
        backgroundColor: { type: "text" as const, label: "Background Color" },
        textColor: { type: "text" as const, label: "Text Color" }
      },
      defaultProps: {
        message: "Join over",
        count: "10,000+",
        backgroundColor: "#10b981",
        textColor: "#ffffff"
      },
      render: ({ message, count, backgroundColor, textColor }) => (
        <div style={{
          background: backgroundColor,
          color: textColor,
          padding: '15px 20px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          width: '100%'
        }}>
          {message} <span style={{ fontSize: '18px' }}>{count}</span> satisfied customers worldwide!
        </div>
      )
    },

    // Container Components
    Container: {
      fields: {
        backgroundColor: { type: "text" as const, label: "Background Color" },
        backgroundImage: { type: "text" as const, label: "Background Image URL" },
        padding: { type: "text" as const, label: "Padding" },
        margin: { type: "text" as const, label: "Margin" },
        borderRadius: { type: "text" as const, label: "Border Radius" },
        border: { type: "text" as const, label: "Border" },
        minHeight: { type: "text" as const, label: "Min Height" },
        maxWidth: { type: "text" as const, label: "Max Width" },
        textAlign: { 
          type: "select" as const, 
          label: "Text Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" }
          ]
        }
      },
      defaultProps: {
        backgroundColor: "#ffffff",
        backgroundImage: "",
        padding: "20px",
        margin: "0",
        borderRadius: "0px",
        border: "none",
        minHeight: "100px",
        maxWidth: "100%",
        textAlign: "left"
      },
      render: ({ backgroundColor, backgroundImage, padding, margin, borderRadius, border, minHeight, maxWidth, textAlign }) => {
        const containerStyle = {
          backgroundColor,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding,
          margin,
          borderRadius,
          border,
          minHeight,
          maxWidth,
          textAlign,
          position: 'relative' as const,
          width: '100%'
        };

        return (
          <div style={containerStyle} className="container-component">
            <DropZone zone="container-content" />
          </div>
        );
      }
    },

    // Layout Components
    TwoColumns: {
      fields: {
        columnGap: { type: "text" as const, label: "Column Gap" },
        leftWidth: { type: "text" as const, label: "Left Column Width %" },
        rightWidth: { type: "text" as const, label: "Right Column Width %" },
        backgroundColor: { type: "text" as const, label: "Background Color" },
        padding: { type: "text" as const, label: "Padding" }
      },
      defaultProps: {
        columnGap: "20px",
        leftWidth: "50",
        rightWidth: "50",
        backgroundColor: "transparent",
        padding: "10px"
      },
      render: ({ columnGap, leftWidth, rightWidth, backgroundColor, padding }) => (
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `${leftWidth}% ${rightWidth}%`, 
            gap: columnGap,
            backgroundColor,
            padding,
            width: '100%',
            minHeight: '200px'
          }}
          className="two-columns-layout"
        >
          <div style={{ border: '2px dashed #e2e8f0', padding: '10px', minHeight: '150px' }}>
            <DropZone zone="left-column" />
          </div>
          <div style={{ border: '2px dashed #e2e8f0', padding: '10px', minHeight: '150px' }}>
            <DropZone zone="right-column" />
          </div>
        </div>
      )
    },

    ThreeColumns: {
      fields: {
        columnGap: { type: "text" as const, label: "Column Gap" },
        backgroundColor: { type: "text" as const, label: "Background Color" },
        padding: { type: "text" as const, label: "Padding" }
      },
      defaultProps: {
        columnGap: "15px",
        backgroundColor: "transparent", 
        padding: "10px"
      },
      render: ({ columnGap, backgroundColor, padding }) => (
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: columnGap,
            backgroundColor,
            padding,
            width: '100%',
            minHeight: '200px'
          }}
          className="three-columns-layout"
        >
          <div style={{ border: '2px dashed #e2e8f0', padding: '10px', minHeight: '150px' }}>
            <DropZone zone="column-1" />
          </div>
          <div style={{ border: '2px dashed #e2e8f0', padding: '10px', minHeight: '150px' }}>
            <DropZone zone="column-2" />
          </div>
          <div style={{ border: '2px dashed #e2e8f0', padding: '10px', minHeight: '150px' }}>
            <DropZone zone="column-3" />
          </div>
        </div>
      )
    },

    // Content Components
    Heading: {
      fields: {
        text: { type: "text" as const, label: "Heading Text" },
        level: { 
          type: "select" as const, 
          label: "Heading Level",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" }
          ]
        },
        fontSize: { type: "text" as const, label: "Font Size (px)" },
        fontWeight: { 
          type: "select" as const, 
          label: "Font Weight",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Bold", value: "bold" },
            { label: "Bolder", value: "bolder" },
            { label: "Lighter", value: "lighter" }
          ]
        },
        color: { type: "text" as const, label: "Text Color" },
        textAlign: { 
          type: "select" as const, 
          label: "Text Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" }
          ]
        },
        marginTop: { type: "text" as const, label: "Margin Top" },
        marginBottom: { type: "text" as const, label: "Margin Bottom" }
      },
      defaultProps: {
        text: "Your Heading Here",
        level: "h2",
        fontSize: "32",
        fontWeight: "bold",
        color: "#000000",
        textAlign: "left",
        marginTop: "0px",
        marginBottom: "20px"
      },
      render: ({ text, level, fontSize, fontWeight, color, textAlign, marginTop, marginBottom }) => {
        const HeadingTag = level as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            style={{
              fontSize: `${fontSize}px`,
              fontWeight,
              color,
              textAlign,
              marginTop,
              marginBottom,
              wordBreak: 'break-word'
            }}
          >
            {text}
          </HeadingTag>
        );
      }
    },

    Text: {
      fields: {
        content: { type: "textarea" as const, label: "Text Content" },
        fontSize: { type: "text" as const, label: "Font Size (px)" },
        fontWeight: { 
          type: "select" as const, 
          label: "Font Weight",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Bold", value: "bold" },
            { label: "Bolder", value: "bolder" },
            { label: "Lighter", value: "lighter" }
          ]
        },
        color: { type: "text" as const, label: "Text Color" },
        lineHeight: { type: "text" as const, label: "Line Height" },
        textAlign: { 
          type: "select" as const, 
          label: "Text Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
            { label: "Justify", value: "justify" }
          ]
        },
        marginTop: { type: "text" as const, label: "Margin Top" },
        marginBottom: { type: "text" as const, label: "Margin Bottom" }
      },
      defaultProps: {
        content: "Your text content goes here. You can write multiple paragraphs and format them as needed.",
        fontSize: "16",
        fontWeight: "normal",
        color: "#333333",
        lineHeight: "1.6",
        textAlign: "left",
        marginTop: "0px",
        marginBottom: "15px"
      },
      render: ({ content, fontSize, fontWeight, color, lineHeight, textAlign, marginTop, marginBottom }) => (
        <p
          style={{
            fontSize: `${fontSize}px`,
            fontWeight,
            color,
            lineHeight,
            textAlign,
            marginTop,
            marginBottom,
            wordBreak: 'break-word'
          }}
        >
          {content}
        </p>
      )
    },

    Button: {
      fields: {
        text: { type: "text" as const, label: "Button Text" },
        url: { type: "text" as const, label: "Button URL" },
        backgroundColor: { type: "text" as const, label: "Background Color" },
        textColor: { type: "text" as const, label: "Text Color" },
        borderRadius: { type: "text" as const, label: "Border Radius" },
        padding: { type: "text" as const, label: "Padding" },
        fontSize: { type: "text" as const, label: "Font Size (px)" },
        fontWeight: { 
          type: "select" as const, 
          label: "Font Weight",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Bold", value: "bold" },
            { label: "Bolder", value: "bolder" }
          ]
        },
        width: { type: "text" as const, label: "Width" },
        textAlign: { 
          type: "select" as const, 
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" }
          ]
        }
      },
      defaultProps: {
        text: "Click Here",
        url: "#",
        backgroundColor: "#3b82f6",
        textColor: "#ffffff",
        borderRadius: "8px",
        padding: "15px 30px",
        fontSize: "16",
        fontWeight: "bold",
        width: "auto",
        textAlign: "center"
      },
      render: ({ text, url, backgroundColor, textColor, borderRadius, padding, fontSize, fontWeight, width, textAlign }) => (
        <div style={{ textAlign }}>
          <a
            href={url}
            style={{
              display: 'inline-block',
              backgroundColor,
              color: textColor,
              borderRadius,
              padding,
              fontSize: `${fontSize}px`,
              fontWeight,
              textDecoration: 'none',
              width: width === 'full' ? '100%' : width,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {text}
          </a>
        </div>
      )
    },

    Image: {
      fields: {
        src: { type: "text" as const, label: "Image URL" },
        alt: { type: "text" as const, label: "Alt Text" },
        width: { type: "text" as const, label: "Width" },
        height: { type: "text" as const, label: "Height" },
        borderRadius: { type: "text" as const, label: "Border Radius" },
        objectFit: { 
          type: "select" as const, 
          label: "Object Fit",
          options: [
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "contain" },
            { label: "Fill", value: "fill" },
            { label: "None", value: "none" }
          ]
        }
      },
      defaultProps: {
        src: "https://via.placeholder.com/400x300",
        alt: "Placeholder image",
        width: "100%",
        height: "300px",
        borderRadius: "0px",
        objectFit: "cover"
      },
      render: ({ src, alt, width, height, borderRadius, objectFit }) => (
        <img
          src={src}
          alt={alt}
          style={{
            width,
            height,
            borderRadius,
            objectFit,
            display: 'block'
          }}
        />
      )
    },

    // Form Components
    Form: {
      fields: {
        title: { type: "text" as const, label: "Form Title" },
        description: { type: "textarea" as const, label: "Form Description" },
        buttonText: { type: "text" as const, label: "Submit Button Text" },
        buttonColor: { type: "text" as const, label: "Button Color" },
        fields: { 
          type: "array" as const, 
          label: "Form Fields",
          arrayFields: {
            label: { type: "text" as const, label: "Field Label" },
            type: { 
              type: "select" as const, 
              label: "Field Type",
              options: [
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Phone", value: "tel" },
                { label: "Textarea", value: "textarea" }
              ]
            },
            required: { type: "radio" as const, label: "Required", options: [
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          }
        }
      },
      defaultProps: {
        title: "Get Your Free Guide",
        description: "Enter your details below to download our free guide",
        buttonText: "Download Now",
        buttonColor: "#10b981",
        fields: [
          { label: "Name", type: "text", required: true },
          { label: "Email", type: "email", required: true }
        ]
      },
      render: ({ title, description, buttonText, buttonColor, fields }) => (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>{title}</h3>
          <p style={{ marginBottom: '20px', color: '#6b7280' }}>{description}</p>
          <form>
            {fields.map((field, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '16px'
                    }}
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '16px'
                    }}
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              style={{
                backgroundColor: buttonColor,
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {buttonText}
            </button>
          </form>
        </div>
      )
    },

    // Marketing Components
    Testimonial: {
      fields: {
        quote: { type: "textarea" as const, label: "Quote" },
        author: { type: "text" as const, label: "Author Name" },
        title: { type: "text" as const, label: "Author Title" },
        image: { type: "text" as const, label: "Author Image URL" },
        rating: { type: "text" as const, label: "Rating (1-5)" }
      },
      defaultProps: {
        quote: "This product completely transformed my business. Highly recommended!",
        author: "John Smith",
        title: "CEO, TechCorp",
        image: "https://via.placeholder.com/80x80",
        rating: "5"
      },
      render: ({ quote, author, title, image, rating }) => (
        <div style={{ 
          padding: '30px', 
          border: '1px solid #e5e7eb', 
          borderRadius: '12px', 
          textAlign: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ marginBottom: '20px' }}>
            {'★'.repeat(parseInt(rating))}{'☆'.repeat(5 - parseInt(rating))}
          </div>
          <blockquote style={{ 
            fontSize: '18px', 
            fontStyle: 'italic', 
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            "{quote}"
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <img 
              src={image} 
              alt={author}
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{author}</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>{title}</div>
            </div>
          </div>
        </div>
      )
    }
  }
};

// Funnel Library Interface
interface FunnelLibraryItem {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'completed' | 'published';
  type: 'funnel' | 'step';
  data: any;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

// Library Component
const FunnelLibrary = ({ onSelectFunnel, onClose }: { onSelectFunnel: (funnel: FunnelLibraryItem) => void, onClose: () => void }) => {
  const [funnels, setFunnels] = useState<FunnelLibraryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const savedFunnels = JSON.parse(localStorage.getItem('funnelLibrary') || '[]');
    setFunnels(savedFunnels);
  }, []);

  const filteredFunnels = funnels.filter(funnel => {
    const matchesSearch = funnel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || funnel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'published': return <Send className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-3/4 flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">My Funnel Library</h2>
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search funnels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {filteredFunnels.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Funnels Found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first funnel to get started'
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFunnels.map((funnel) => (
                <Card key={funnel.id} className="cursor-pointer hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg truncate">{funnel.name}</CardTitle>
                      <Badge className={`ml-2 ${getStatusColor(funnel.status)} flex items-center`}>
                        {getStatusIcon(funnel.status)}
                        <span className="ml-1 capitalize">{funnel.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {funnel.description}
                    </p>
                    
                    <div className="text-xs text-muted-foreground mb-4">
                      <div>Created: {new Date(funnel.createdAt).toLocaleDateString()}</div>
                      <div>Updated: {new Date(funnel.updatedAt).toLocaleDateString()}</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => onSelectFunnel(funnel)}
                        className="flex-1"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Open
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          const updatedFunnels = funnels.filter(f => f.id !== funnel.id);
                          setFunnels(updatedFunnels);
                          localStorage.setItem('funnelLibrary', JSON.stringify(updatedFunnels));
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Puck Funnel Editor Component
interface PuckFunnelEditorProps {
  onBack: () => void;
  onSave: (data: any) => void;
  funnelTemplate: {
    name: string;
    description: string;
  };
  initialData?: any;
}

export default function PuckFunnelEditor({ onBack, onSave, funnelTemplate, initialData }: PuckFunnelEditorProps) {
  const [data, setData] = useState(initialData || { content: [], root: { props: { title: funnelTemplate.name } } });
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showLibrary, setShowLibrary] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [funnelStatus, setFunnelStatus] = useState<'draft' | 'completed' | 'published'>('draft');
  const [showPageSettings, setShowPageSettings] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(true);
  const [aiSettings, setAiSettings] = useState({
    autoOptimizeHeadlines: false,
    aiABTesting: false,
    smartContentSuggestions: false,
    smartCTAPlacement: false,
    exitIntentPopups: false,
    socialProofAutomation: false,
    personalizedContent: false,
    dynamicPricing: false
  });
  const [pageSettings, setPageSettings] = useState({
    backgroundColor: '#ffffff',
    canvasColor: '#f8fafc',
    maxWidth: '1200px',
    fontFamily: 'Inter, sans-serif'
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      autoSaveFunnel();
    }, 10000); // Auto-save every 10 seconds

    return () => clearInterval(autoSaveInterval);
  }, [data]);

  const autoSaveFunnel = async () => {
    setIsAutoSaving(true);
    
    const funnelData: FunnelLibraryItem = {
      id: initialData?.id || `funnel-${Date.now()}`,
      name: funnelTemplate.name,
      description: funnelTemplate.description,
      status: funnelStatus,
      type: 'funnel',
      data: { ...data, pageSettings },
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to localStorage (funnel library)
    const existingFunnels = JSON.parse(localStorage.getItem('funnelLibrary') || '[]');
    const funnelIndex = existingFunnels.findIndex((f: FunnelLibraryItem) => f.id === funnelData.id);
    
    if (funnelIndex >= 0) {
      existingFunnels[funnelIndex] = funnelData;
    } else {
      existingFunnels.push(funnelData);
    }
    
    localStorage.setItem('funnelLibrary', JSON.stringify(existingFunnels));
    setLastSaved(new Date());
    setIsAutoSaving(false);
  };

  const handleSave = () => {
    const funnelData = {
      ...data,
      pageSettings,
      status: funnelStatus,
      name: funnelTemplate.name,
      description: funnelTemplate.description
    };
    
    onSave(funnelData);
    autoSaveFunnel();
  };

  const handlePublish = () => {
    setFunnelStatus('published');
    const publishedData = {
      ...data,
      pageSettings,
      status: 'published',
      name: funnelTemplate.name,
      description: funnelTemplate.description
    };
    
    onSave(publishedData);
    autoSaveFunnel();
    
    // Show success message
    alert('Funnel step published successfully!');
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return pageSettings.maxWidth ? `max-w-[${pageSettings.maxWidth}]` : 'max-w-6xl';
    }
  };

  const handleSelectFromLibrary = (selectedFunnel: FunnelLibraryItem) => {
    setData(selectedFunnel.data);
    setFunnelStatus(selectedFunnel.status);
    if (selectedFunnel.data.pageSettings) {
      setPageSettings(selectedFunnel.data.pageSettings);
    }
    setShowLibrary(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{funnelTemplate.name}</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Badge className={`${
                funnelStatus === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                funnelStatus === 'completed' ? 'bg-blue-100 text-blue-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {funnelStatus.charAt(0).toUpperCase() + funnelStatus.slice(1)}
              </Badge>
              {lastSaved && (
                <span>
                  {isAutoSaving ? 'Saving...' : `Saved ${lastSaved.toLocaleTimeString()}`}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Viewport Controls */}
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={() => setShowLibrary(true)}>
            <BookOpen className="w-4 h-4 mr-2" />
            Library
          </Button>

          <Button 
            variant={isAIAssistantOpen ? "default" : "outline"} 
            size="sm" 
            onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>

          <Button variant="outline" size="sm" onClick={() => setShowPageSettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button 
            size="sm" 
            onClick={handlePublish}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1" style={{ backgroundColor: pageSettings.canvasColor }}>
        <div className={`mx-auto ${getViewportClass()} transition-all duration-200`}>
          <Puck
            config={config}
            data={data}
            onPublish={(data) => {
              setData(data);
              handleSave();
            }}
            onChange={setData}
            renderHeader={false}
            renderHeaderActions={false}
            iframe={{
              enabled: true,
            }}
          />
        </div>
      </div>

      {/* Library Modal */}
      {showLibrary && (
        <FunnelLibrary 
          onSelectFunnel={handleSelectFromLibrary}
          onClose={() => setShowLibrary(false)}
        />
      )}

      {/* Page Settings Panel */}
      {showPageSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Page Settings & AI Optimizations
              </h3>
              <Button variant="ghost" onClick={() => setShowPageSettings(false)}>
                ✕
              </Button>
            </div>
            
            <Tabs defaultValue="design" className="w-full">
              <TabsList className="grid w-full grid-cols-2 m-6 mb-0">
                <TabsTrigger value="design">Design Settings</TabsTrigger>
                <TabsTrigger value="ai">AI Optimizations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="design" className="p-6 space-y-4">
                <div>
                  <Label className="text-sm">Page Background Color</Label>
                  <Input
                    type="color"
                    value={pageSettings.backgroundColor}
                    onChange={(e) => setPageSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Canvas Background Color</Label>
                  <Input
                    type="color"
                    value={pageSettings.canvasColor}
                    onChange={(e) => setPageSettings(prev => ({ ...prev, canvasColor: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Max Width</Label>
                  <Input
                    value={pageSettings.maxWidth}
                    onChange={(e) => setPageSettings(prev => ({ ...prev, maxWidth: e.target.value }))}
                    placeholder="e.g., 1200px"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Font Family</Label>
                  <Select 
                    value={pageSettings.fontFamily} 
                    onValueChange={(value) => setPageSettings(prev => ({ ...prev, fontFamily: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                      <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                      <SelectItem value="Poppins, sans-serif">Poppins</SelectItem>
                      <SelectItem value="Montserrat, sans-serif">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Content Optimization
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Auto-optimize headlines</Label>
                      <Switch 
                        checked={aiSettings.autoOptimizeHeadlines}
                        onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, autoOptimizeHeadlines: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">AI-powered A/B testing</Label>
                      <Switch 
                        checked={aiSettings.aiABTesting}
                        onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, aiABTesting: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Smart content suggestions</Label>
                      <Switch 
                        checked={aiSettings.smartContentSuggestions}
                        onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, smartContentSuggestions: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Conversion Optimization
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Smart CTA placement</Label>
                      <Switch 
                        checked={aiSettings.smartCTAPlacement}
                        onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, smartCTAPlacement: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Exit-intent popups</Label>
                      <Switch 
                        checked={aiSettings.exitIntentPopups}
                        onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, exitIntentPopups: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Social proof automation</Label>
                      <Switch 
                        checked={aiSettings.socialProofAutomation}
                        onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, socialProofAutomation: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Performance Settings
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">Page Load Speed Priority</Label>
                      <Slider
                        defaultValue={[75]}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Mobile Optimization Level</Label>
                      <Slider
                        defaultValue={[90]}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Audience Targeting
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">Target Audience</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select audience type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="b2b">B2B Professional</SelectItem>
                          <SelectItem value="b2c">B2C Consumer</SelectItem>
                          <SelectItem value="ecommerce">E-commerce Shopper</SelectItem>
                          <SelectItem value="saas">SaaS User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Personalized content</Label>
                      <Switch 
                        checked={aiSettings.personalizedContent}
                        onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, personalizedContent: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Dynamic pricing display</Label>
                      <Switch 
                        checked={aiSettings.dynamicPricing}
                        onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, dynamicPricing: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Apply AI Optimizations
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
